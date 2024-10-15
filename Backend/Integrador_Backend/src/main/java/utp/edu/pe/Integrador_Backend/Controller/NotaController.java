package utp.edu.pe.Integrador_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utp.edu.pe.Integrador_Backend.Entidades.Nota;
import utp.edu.pe.Integrador_Backend.Service.NotaService;
@RestController
@RequestMapping("api/notas")
public class NotaController {

    @Autowired
    private NotaService notaService;

    @PostMapping("/alumno/{alumnoId}/subcurso/{subcursoId}")
    public ResponseEntity<Nota> registrarNota(
            @PathVariable Long alumnoId, @PathVariable Long subcursoId, @RequestBody Nota nota) {
        Nota nuevaNota = notaService.registrarNota(alumnoId, subcursoId, nota);
        return ResponseEntity.ok(nuevaNota);
    }
}
