package utp.edu.pe.Integrador_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utp.edu.pe.Integrador_Backend.Entidades.Contenido;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Service.ContenidoService;

import java.util.List;

@RestController
@RequestMapping("/api/contenidos")
public class ContenidoController {

    @Autowired
    private ContenidoService contenidoService;

    @PostMapping("/subir")
    public ResponseEntity<Contenido> subirContenido(
            @RequestParam("subcursoId") Long subcursoId,
            @RequestParam("nivel") Nivel nivel,
            @RequestParam("grado") int grado,
            @RequestParam("unidad") int unidad,
            @RequestParam("nombreContenido") String nombreContenido,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("isTarea") Boolean isTarea,
            @RequestParam("archivo") MultipartFile archivo) {

        Contenido contenido = contenidoService.subirContenido(
                subcursoId, nivel, grado, unidad, nombreContenido, descripcion, isTarea, archivo);

        return new ResponseEntity<>(contenido, HttpStatus.CREATED);
    }


    @GetMapping("/nivel/{nivel}/grado/{grado}/subcurso/{subcursoId}/unidad/{unidad}")
    public ResponseEntity<List<Contenido>> obtenerContenidos(
            @PathVariable Nivel nivel,
            @PathVariable int grado,
            @PathVariable Long subcursoId,
            @PathVariable int unidad) {

        List<Contenido> contenidos = contenidoService.obtenerContenidos(subcursoId, nivel, grado, unidad);
        return new ResponseEntity<>(contenidos, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{contenidoId}")
    public ResponseEntity<Void> eliminarContenido(@PathVariable Long contenidoId) {
        contenidoService.eliminarContenido(contenidoId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
