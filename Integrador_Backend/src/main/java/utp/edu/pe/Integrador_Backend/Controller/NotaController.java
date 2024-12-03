package utp.edu.pe.Integrador_Backend.Controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utp.edu.pe.Integrador_Backend.Entidades.Nota;
import utp.edu.pe.Integrador_Backend.Service.NotaService;

import java.util.List;

@RestController
@RequestMapping("api/notas")
public class NotaController {

    @Autowired
    private NotaService notaService;

    @PostMapping("/alumno/{usuarioId}/subcurso/{subcursoId}/unidad/{unidad}/calificacion/{calificacionNumero}")
    public ResponseEntity<Nota> registrarCalificacion(
            @PathVariable Long usuarioId ,
            @PathVariable Long subcursoId,
            @PathVariable Integer unidad,
            @PathVariable Integer calificacionNumero,
            @RequestBody  Double calificacion) {
        Nota nuevaNota = notaService.registrarCalificacion(usuarioId, subcursoId, unidad, calificacionNumero, calificacion);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevaNota);
    }

    @GetMapping("/subcurso/{subcursoId}/unidad/{unidad}/alumno/{usuarioId}")
    public ResponseEntity<List<Nota>> obtenerNotasPorUnidadSubcursoYAlumno(
            @PathVariable Long subcursoId,
            @PathVariable Integer unidad,
            @PathVariable Long usuarioId) {
        List<Nota> notas = notaService.obtenerNotasPorAlumnoYUnidad(subcursoId, unidad, usuarioId);
        return ResponseEntity.ok(notas);
    }


    @GetMapping("/alumno/{usuarioId}/subcurso/{subcursoId}/unidad/{unidad}/promedio")
    public ResponseEntity<Double> obtenerPromedioUnidad(
            @PathVariable Long usuarioId,
            @PathVariable Long subcursoId,
            @PathVariable Integer unidad) {
        Double promedio = notaService.calcularPromedioPorUnidad(usuarioId, subcursoId, unidad);
        return ResponseEntity.ok(promedio);
    }

    @GetMapping("/alumno/{usuarioId}/subcurso/{subcursoId}/bimestre/{bimestre}/promedio")
    public ResponseEntity<Double> obtenerPromedioBimestral(
            @PathVariable Long usuarioId,
            @PathVariable Long subcursoId,
            @PathVariable Integer bimestre) {
        Double promedioBimestral = notaService.calcularPromedioBimestral(usuarioId, subcursoId, bimestre);
        return ResponseEntity.ok(promedioBimestral);
    }

    @GetMapping("/alumno/{usuarioId}/curso/{cursoId}/promedioFinal")
    public ResponseEntity<Double> obtenerPromedioFinalCurso(
            @PathVariable Long usuarioId,
            @PathVariable Long cursoId) {
        Double promedioFinalCurso = notaService.calcularPromedioFinalDelCurso(usuarioId, cursoId);
        return ResponseEntity.ok(promedioFinalCurso);
    }

}
