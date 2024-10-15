package utp.edu.pe.Integrador_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.UpdateRequest;
import utp.edu.pe.Integrador_Backend.Service.AlumnoService;

import java.util.List;
@RestController
@Controller
@RequestMapping("api/alumnos")
public class AlumnoController {
    @Autowired
    private AlumnoService alumnoService;

    @GetMapping("/listar")
    public ResponseEntity<List<Alumno>> listarAlumnos() {
        List<Alumno> alumnos = alumnoService.listarAlumnos();
        return ResponseEntity.ok(alumnos);
    }

    // Endpoint para crear un nuevo alumno
    @PostMapping("/registrar")
    public ResponseEntity<Alumno> crearAlumno(@RequestBody Alumno alumno) {
        Alumno nuevoAlumno = alumnoService.crearAlumno(alumno);
        return ResponseEntity.ok(nuevoAlumno);
    }

    // Endpoint para actualizar el teléfono y/o contraseña del alumno
    @PutMapping("/update/{id}")
    public ResponseEntity<Alumno> actualizarAlumno(
            @PathVariable Long id,
            @RequestBody UpdateRequest request) {

        Alumno alumnoActualizado = alumnoService.actualizarAlumno(id, request.getTelefono(), request.getPassword());
        return ResponseEntity.ok(alumnoActualizado);
    }
}
