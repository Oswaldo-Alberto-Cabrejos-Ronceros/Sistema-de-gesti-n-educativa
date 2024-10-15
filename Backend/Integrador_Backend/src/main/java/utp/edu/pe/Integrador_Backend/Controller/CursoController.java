package utp.edu.pe.Integrador_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utp.edu.pe.Integrador_Backend.Entidades.Curso;
import utp.edu.pe.Integrador_Backend.Service.CursoService;

import java.util.List;
@RestController
@RequestMapping("api/cursos")
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @GetMapping
    public ResponseEntity<List<Curso>> listarCursos() {
        List<Curso> cursos = cursoService.listarCursos();
        return ResponseEntity.ok(cursos);
    }

    @GetMapping("/{cursoId}")
    public ResponseEntity<Curso> obtenerCurso(@PathVariable Long cursoId) {
        Curso curso = cursoService.obtenerCursoPorId(cursoId);
        return ResponseEntity.ok(curso);
    }

    @PostMapping
    public ResponseEntity<Curso> crearCurso(@RequestBody Curso curso) {
        Curso nuevoCurso = cursoService.crearCurso(curso);
        return ResponseEntity.ok(nuevoCurso);
    }

    @PutMapping("/{cursoId}")
    public ResponseEntity<Curso> actualizarCurso(@PathVariable Long cursoId, @RequestBody Curso cursoActualizado) {
        Curso curso = cursoService.actualizarCurso(cursoId, cursoActualizado);
        return ResponseEntity.ok(curso);
    }

    @DeleteMapping("/{cursoId}")
    public ResponseEntity<Void> eliminarCurso(@PathVariable Long cursoId) {
        cursoService.eliminarCurso(cursoId);
        return ResponseEntity.noContent().build();
    }
}
