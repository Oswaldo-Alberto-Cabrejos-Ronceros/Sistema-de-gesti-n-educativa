package utp.edu.pe.Integrador_Backend.Service;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import utp.edu.pe.Integrador_Backend.Entidades.Contenido;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;
import utp.edu.pe.Integrador_Backend.Repository.ContenidoRepository;
import utp.edu.pe.Integrador_Backend.Repository.SubcursoRepository;

import java.util.List;

@Service
public class ContenidoService {

    @Autowired
    private ContenidoRepository contenidoRepository;

    @Autowired
    private SubcursoRepository subcursoRepository;

    @Autowired
    private S3Service s3Service;


    public Contenido subirContenido(
            Long subcursoId, Nivel nivel, int grado, int unidad,
            String nombreContenido, String descripcion, Boolean isTarea,
            MultipartFile archivo) {

        // Obtener el subcurso
        Subcurso subcurso = subcursoRepository.findById(subcursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Subcurso no encontrado con id: " + subcursoId));

        // Subir el archivo a S3
        String rutaDestino = "Contenido/"+nivel.toString() + "/" + grado + "/" + "unidad_" + unidad + "/" + subcurso.getNombre();
        String urlArchivo = s3Service.subirArchivo(archivo, rutaDestino);

        // Crear el nuevo contenido
        Contenido contenido = new Contenido();
        contenido.setSubcurso(subcurso);
        contenido.setNivel(nivel);
        contenido.setGrado(grado);
        contenido.setUnidad(unidad);
        contenido.setNombreContenido(nombreContenido);
        contenido.setDescripcion(descripcion);
        contenido.setUrlArchivo(urlArchivo);
        contenido.setIsTarea(isTarea);

        return contenidoRepository.save(contenido);
    }

    //  metodo para obtener contenidos por nivel, grado, subcurso y unidad
    @Transactional(readOnly = true)
    public List<Contenido> obtenerContenidos(Long subcursoId, Nivel nivel, int grado, int unidad) {
        Subcurso subcurso = subcursoRepository.findById(subcursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Subcurso no encontrado con id: " + subcursoId));

        return contenidoRepository.findByNivelAndGradoAndSubcursoAndUnidad(nivel, grado, subcurso, unidad);
    }

    // metodo para eliminar contenido
    public void eliminarContenido(Long contenidoId) {
        Contenido contenido = contenidoRepository.findById(contenidoId)
                .orElseThrow(() -> new ResourceNotFoundException("Contenido no encontrado con id: " + contenidoId));

        // Eliminar el archivo de S3
        if (contenido.getUrlArchivo() != null) {
            s3Service.eliminarArchivo(contenido.getUrlArchivo());
        }

        // Eliminar el registro en la base de datos
        contenidoRepository.delete(contenido);
    }
}
