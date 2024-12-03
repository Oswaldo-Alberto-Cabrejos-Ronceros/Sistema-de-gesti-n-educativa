package utp.edu.pe.Integrador_Backend.Controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import utp.edu.pe.Integrador_Backend.Entidades.*;
import utp.edu.pe.Integrador_Backend.Repository.AsignacionProfesorRepository;
import utp.edu.pe.Integrador_Backend.Service.AsignacionProfesorService;
import utp.edu.pe.Integrador_Backend.Service.HorarioService;
import utp.edu.pe.Integrador_Backend.Service.ProfesorService;

import java.util.Collections;
import java.util.List;

@RestController
@Controller
@RequestMapping("api/profesores")
public class ProfesorController {

    @Autowired
    private AsignacionProfesorRepository asignacionProfesorRepository;

    @Autowired
    private ProfesorService profesorService;

    @Autowired
    private AsignacionProfesorService asignacionProfesorService;

    @Autowired
    private HorarioService horarioService;

    // Crear un nuevo profesor
    @PostMapping("/registrar")
    public ResponseEntity<Profesor> crearProfesor(@Valid @RequestBody Profesor profesor) {
        Profesor nuevoProfesor = profesorService.crearProfesor(profesor);
        return ResponseEntity.ok(nuevoProfesor);
    }

    // Listar todos los profesores
    @GetMapping
    public ResponseEntity<List<Profesor>> listarProfesores() {
        List<Profesor> profesores = profesorService.listarProfesores();
        return ResponseEntity.ok(profesores);
    }

    // Buscar profesor por ID
    @GetMapping("/{id}")
    public ResponseEntity<Profesor> obtenerProfesorPorId(@PathVariable Long id) {
        Profesor profesor = profesorService.obtenerProfesorPorId(id);
        return ResponseEntity.ok(profesor);
    }


    @GetMapping("/listar/nivel/{nivel}")
    public ResponseEntity<List<Profesor>> ListarPorNivel(@PathVariable Nivel nivel) {
        List<Profesor> profesor = profesorService.ListarProfesorPorNivel(nivel);
        return ResponseEntity.ok(profesor);
    }

    // Buscar profesor por DNI
    @GetMapping("/buscarPorDni")
    public ResponseEntity<List<Profesor>> buscarProfesoresPorDni(@RequestParam String dni) {
       try{
        List<Profesor> profesores = profesorService.buscarProfesoresPorDniPrefix(dni);
           return ResponseEntity.ok(profesores);
        }catch (RuntimeException e){
           return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());       }

    }

    // Actualizar teléfono y/o contraseña del profesor
    @PutMapping("/actualizar/{id}")
    public ResponseEntity<Profesor> actualizarProfesor(@PathVariable Long id, @RequestBody UpdateRequest request) {
        Profesor profesorActualizado = profesorService.actualizarProfesor(id, request.getTelefono(), request.getPassword());
        return ResponseEntity.ok(profesorActualizado);
    }

    // Endpoint para actualizar al profesor (PARA ADMINS)
    @PutMapping("/updateAll/{id}")
    public ResponseEntity<Profesor> actualizarDatosProfesor(
            @PathVariable Long id,
            @RequestBody Profesor profesorRequest) {

        Profesor profesorActualizado = profesorService.actualizarTodosLosDatosProfesor(id, profesorRequest);
        return ResponseEntity.ok(profesorActualizado);
    }

    // Eliminar profesor
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarProfesor(@PathVariable Long id) {
        horarioService.eliminarHorarioProfesor(id);
        profesorService.eliminarProfesor(id);
        return ResponseEntity.ok("Profesor eliminado");
    }

    // Asignar subcurso a un profesor
    @PostMapping("/asignar")
    public ResponseEntity<?> asignarSubcursos(@RequestBody AsignarSubcursosRequest request) {
        try {
            asignacionProfesorService.asignarSubcursos(request.getUsuarioId(), request.getSubcursosIds());
            return ResponseEntity.ok("Subcursos asignados correctamente.");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{profesorId}/asignaciones")
    public ResponseEntity<List<AsignacionProfesor>> obtenerAsignacionesPorProfesor(@PathVariable Long profesorId) {
        List<AsignacionProfesor> asignaciones = asignacionProfesorRepository.findByProfesor_UsuarioId(profesorId);
        if (asignaciones.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(asignaciones);
    }

    // Desasignar subcurso de un profesor
    @DeleteMapping("/desasignar/{asignacionId}")
    public ResponseEntity<Void> desasignarSubcurso(@PathVariable Long asignacionId) {
        asignacionProfesorService.desasignarSubcurso(asignacionId);
        return ResponseEntity.noContent().build();
    }
}

