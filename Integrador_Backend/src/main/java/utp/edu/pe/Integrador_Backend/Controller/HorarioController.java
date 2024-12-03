package utp.edu.pe.Integrador_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utp.edu.pe.Integrador_Backend.Entidades.Horario;
import utp.edu.pe.Integrador_Backend.Entidades.HorarioProfesor;
import utp.edu.pe.Integrador_Backend.Service.HorarioService;
import utp.edu.pe.Integrador_Backend.Service.S3Service;


@RestController
@RequestMapping("/api/horarios")
public class HorarioController {
    @Autowired
    private S3Service s3Service;

    @Autowired
    private HorarioService horarioService;


    ///////////////////////////// METODOS PARA EL ALUMNO ////////////////////////

    @PostMapping("/alumno/subir")
    public ResponseEntity<Horario> subirHorarioAlumno(
            @RequestParam("nivel") String nivel,
            @RequestParam("grado") int grado,
            @RequestParam("seccion") String seccion,
            @RequestParam("archivo") MultipartFile archivo) {

        // Construir la ruta destino en S3
        String rutaDestino = nivel + "/" + grado + "/" + seccion;

        // Subir el archivo a S3 y obtener la URL
        String urlArchivo = s3Service.subirArchivo(archivo, rutaDestino);

        // Crear o actualizar el horario en la base de datos
        Horario horario = horarioService.guardarHorarioAlumno(nivel, grado,seccion, urlArchivo);

        return new ResponseEntity<>(horario, HttpStatus.CREATED);
    }

    @GetMapping("/alumno/nivel/{nivel}/grado/{grado}/seccion/{seccion}")
    public ResponseEntity<Horario> obtenerHorarioAlumno(
            @PathVariable String nivel,
            @PathVariable int grado,
            @PathVariable String seccion) {
        Horario horario = horarioService.obtenerHorarioAlumno(nivel, grado, seccion);
        return new ResponseEntity<>(horario, HttpStatus.OK);
    }


    @DeleteMapping("/alumno/eliminar/{id}")
    public ResponseEntity<Void> eliminarHorarioAlumno(@PathVariable Long id) {
        horarioService.eliminarHorarioAlumno(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    ///////////////////////////// METODOS PARA EL PROFESOR ////////////////////////

    @PostMapping("/profesor/subir")
    public ResponseEntity<HorarioProfesor> subirHorarioProfesor(
            @RequestParam("usuarioId") Long usuarioId,
            @RequestParam("archivo") MultipartFile archivo) {

        // Construir la ruta destino en S3
        String rutaDestino = "PROFESOR/" + usuarioId;

        // Subir el archivo a S3 y obtener la URL
        String urlArchivo = s3Service.subirArchivo(archivo, rutaDestino);

        // Guardar o actualizar el horario en la base de datos
        HorarioProfesor horarioProfesor = horarioService.guardarHorarioProfesor(usuarioId, urlArchivo);

        return new ResponseEntity<>(horarioProfesor, HttpStatus.CREATED);
    }

    @GetMapping("/profesor/{usuarioId}")
    public ResponseEntity<HorarioProfesor> obtenerHorarioProfesor(@PathVariable Long usuarioId) {
        HorarioProfesor horarioProfesor = horarioService.obtenerHorarioProfesor(usuarioId);
        return new ResponseEntity<>(horarioProfesor, HttpStatus.OK);
    }

    @DeleteMapping("/profesor/{usuarioId}")
    public ResponseEntity<Void> eliminarHorarioProfesor(@PathVariable Long usuarioId) {
        horarioService.eliminarHorarioProfesor(usuarioId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
