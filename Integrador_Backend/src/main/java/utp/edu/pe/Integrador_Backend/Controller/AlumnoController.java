package utp.edu.pe.Integrador_Backend.Controller;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utp.edu.pe.Integrador_Backend.Entidades.*;
import utp.edu.pe.Integrador_Backend.Service.AlumnoService;
import utp.edu.pe.Integrador_Backend.Service.NotaService;

import java.util.Collections;
import java.util.List;


@RestController
@RequestMapping("api/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;
    @Autowired
    private NotaService notaService;

    @GetMapping
    public ResponseEntity<List<Alumno>> listarAlumnos() {
        List<Alumno> alumnos = alumnoService.listarAlumnos();
        return ResponseEntity.ok(alumnos);
    }

    @GetMapping("/buscarPorDni")
    public ResponseEntity<List<Alumno>> buscarAlumnosPorDNI(@RequestParam String dni) {
        try {
            List<Alumno> alumnos = alumnoService.buscarAlumnosPorDNI(dni);
            return ResponseEntity.ok(alumnos);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
    }

    @GetMapping("/buscar")
    public ResponseEntity<?> buscarAlumnos(
            @RequestParam(required = false) Nivel nivel,
            @RequestParam(required = false) Integer grado,
            @RequestParam(required = false) String seccion) {

        try {
            List<Alumno> alumnos = alumnoService.buscarAlumnos(nivel, grado, seccion);
            return ResponseEntity.ok(alumnos);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/list/subcurso/{subcursoId}/grado/{grado}")
    public ResponseEntity<List<Alumno>> obtenerAlumnosPorGradoYSubcurso(
            @PathVariable Long subcursoId, @PathVariable Integer grado) {
        List<Alumno> alumnos = alumnoService.obtenerAlumnosPorGradoYSubcurso(grado, subcursoId);
        return ResponseEntity.ok(alumnos);
    }

    //notas por id de un alumno
    @GetMapping("/{usuarioId}/notas")
    public ResponseEntity<List<Nota>> obtenerNotasPorAlumno(@PathVariable Long usuarioId) {
        List<Nota> notas = alumnoService.obtenerNotasPorAlumno(usuarioId);
        return ResponseEntity.ok(notas);
    }
    //notas de un alumno en un subcurso especifico
    @GetMapping("/{usuarioId}/subcurso/{subcursoId}/notas")
    public ResponseEntity<List<Nota>> obtenerNotasPorAlumnoYSubcurso(
            @PathVariable Long usuarioId,
            @PathVariable Long subcursoId) {
        List<Nota> notas = alumnoService.obtenerNotasPorAlumnoYSubcurso(usuarioId, subcursoId);
        return ResponseEntity.ok(notas);
    }

    // Endpoint para crear un nuevo alumno
    @PostMapping("/registrar")
    public ResponseEntity<Alumno> crearAlumno(@Valid @RequestBody Alumno alumno) {
        Alumno nuevoAlumno = alumnoService.crearAlumno(alumno);
        return ResponseEntity.ok(nuevoAlumno);
    }

    // Endpoint para actualizar el teléfono y/o contraseña del alumno
    @PutMapping("/update/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(
            @PathVariable Long id,
            @Valid @RequestBody UpdateRequest request) {

        Alumno alumnoActualizado = alumnoService.actualizarAlumno(id, request.getTelefono(), request.getPassword());
        return ResponseEntity.ok(alumnoActualizado);
    }
    // Endpoint para actualizar al alumno (PARA ADMINS)
    @PutMapping("/updateAll/{id}")
    public ResponseEntity<Alumno> actualizarDatosAlumno(
            @PathVariable Long id,
            @RequestBody Alumno alumnoRequest) {

        Alumno alumnoActualizado = alumnoService.actualizarTodosLosDatosAlumno(id, alumnoRequest);
        return ResponseEntity.ok(alumnoActualizado);
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarAlumno(@PathVariable Long id) {
        alumnoService.eliminarAlumno(id);
        return ResponseEntity.ok("Alumno Eliminado");
    }

    @GetMapping("/grado/{grado}/nivel/{nivel}/honor")
    public ResponseEntity<List<NotaService.AlumnoPromedio>> listarAlumnosPorGradoNivelConMayorPromedio(
            @PathVariable Integer grado,
            @PathVariable Nivel nivel) {

        List<NotaService.AlumnoPromedio> alumnosConPromedio = notaService.listarAlumnosPorGradoNivelConMayorPromedio(grado, nivel);
        return ResponseEntity.ok(alumnosConPromedio);
    }

}
