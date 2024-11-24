package utp.edu.pe.Integrador_Backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Service.ReporteService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@RestController
@RequestMapping("/reportes")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @GetMapping("/notas/auxiliar")
    public ResponseEntity<byte[]> generarReporteNotasAuxiliar(
            @RequestParam Nivel nivel,
            @RequestParam Integer grado,
            @RequestParam Long subcursoId,
            @RequestParam Integer unidad) throws IOException {

        // Crear el archivo Excel en memoria
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        reporteService.generarReporteNotasPorSubcursoYUnidad(nivel, grado, subcursoId, unidad, outputStream);

        // Configurar encabezados de respuesta para la descarga
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "ReporteNotas.xlsx");

        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }


    @GetMapping("/notas/bimestral")
    public ResponseEntity<byte[]> generarReporteNotasBimestral(
            @RequestParam Nivel nivel,
            @RequestParam Integer grado,
            @RequestParam Long subcursoId,
            @RequestParam Integer bimestre) throws IOException {

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        reporteService.generarReporteNotasPorSubcursoYBimestre(nivel, grado, subcursoId, bimestre, outputStream);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "ReporteNotas.xlsx");

        return new ResponseEntity<>(outputStream.toByteArray(), headers, HttpStatus.OK);
    }
}
