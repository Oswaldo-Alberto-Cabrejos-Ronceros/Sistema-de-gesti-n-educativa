package utp.edu.pe.Integrador_Backend.Controller;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Rol;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;
import utp.edu.pe.Integrador_Backend.Service.SubcursoService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/subcursos")
public class SubcursoController {

    @Autowired
    private SubcursoService subcursoService;

    @GetMapping("/list")
    public ResponseEntity<List<Subcurso>> listarSubcursos() {
        List<Subcurso> subcursos = subcursoService.listarSubcursos();
        return ResponseEntity.ok(subcursos);
    }

    @GetMapping("/nivel/{nivel}")
    public ResponseEntity<List<Subcurso>> obtenerSubcursosPorNivel(@PathVariable Nivel nivel) {
        List<Subcurso> subcursos = subcursoService.listarSubcursosPornivel(nivel);
        return ResponseEntity.ok(subcursos);
    }


    @GetMapping("/curso/{cursoId}")
    public ResponseEntity<List<Subcurso>> listarSubcursosPorCursoId(@PathVariable Long cursoId) {
        List<Subcurso> subcursos = subcursoService.listarSubcursosPorCursoId(cursoId);
        return ResponseEntity.ok(subcursos);
    }

    // Endpoint para listar subcursos según el ID del usuario y su rol
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Subcurso>> listarSubcursosPorUsuario(
            @PathVariable Long usuarioId,
            @RequestParam Rol rol) {
        List<Subcurso> subcursos = subcursoService.listarSubcursosPorUsuarioId(usuarioId, rol);
        return ResponseEntity.ok(subcursos);
    }


    @PostMapping("/curso/{cursoId}")
    public ResponseEntity<Subcurso> crearSubcurso(@PathVariable Long cursoId, @RequestBody @Valid Subcurso subcurso) {
        Subcurso nuevoSubcurso = subcursoService.crearSubcurso(cursoId, subcurso);
        return ResponseEntity.ok(nuevoSubcurso);
    }

    @GetMapping("/{subcursoId}")
    public ResponseEntity<Subcurso> obtenerSubcurso(@PathVariable Long subcursoId) {
        Subcurso subcurso = subcursoService.obtenerSubcursoPorId(subcursoId);
        return ResponseEntity.ok(subcurso);
    }

    @PutMapping("/update/{subcursoId}")
    public ResponseEntity<Subcurso> actualizarSubcurso(
            @PathVariable Long subcursoId,
            @RequestBody Map<String, String> camposActualizados) {

        String nuevoNombre = camposActualizados.get("nombre");
        String nuevaDescripcion = camposActualizados.get("descripcion");

        Subcurso subcursoActualizado = subcursoService.actualizarSubcurso(subcursoId, nuevoNombre, nuevaDescripcion);
        return ResponseEntity.ok(subcursoActualizado);
    }

    @DeleteMapping("/{subcursoId}")
    public ResponseEntity<String> eliminarSubcurso(@PathVariable Long subcursoId) {
        subcursoService.eliminarSubcurso(subcursoId);
        return ResponseEntity.ok("Subcurso eliminado correctamente");
    }

}
