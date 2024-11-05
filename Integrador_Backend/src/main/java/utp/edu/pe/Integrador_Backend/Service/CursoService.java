package utp.edu.pe.Integrador_Backend.Service;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utp.edu.pe.Integrador_Backend.Entidades.Curso;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Repository.CursoRepository;

import java.util.List;
@Service
public class CursoService {
    @Autowired
    private CursoRepository cursoRepository;

    private static final Logger logger = LoggerFactory.getLogger(CursoService.class);


    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }


    public List<Curso> listarCursosPorNivel(Nivel nivel) {
        return cursoRepository.findByNivel(nivel);
    }

    public Curso obtenerCursoPorId(Long cursoId) {
        return cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con id: " + cursoId));
    }

    @Transactional
    public Curso crearCurso(Curso curso) {
        logger.info("Creando curso: {} de nivel {}, a las {}", curso.getNombre(), curso.getNivel(), new java.util.Date());
        validarNivel(curso.getNivel());  // Validar el nivel antes de guardar
        // Verificar si ya existe un curso con el mismo nombre y nivel
        if (cursoRepository.existsByNombreIgnoreCaseAndNivel(curso.getNombre(), curso.getNivel())) {
            throw new RuntimeException("Ya existe un curso con el nombre " + curso.getNombre() + " en el nivel " + curso.getNivel());
        }

        Curso nuevoCurso = cursoRepository.save(curso);
        logger.info("Curso creado: ID: {}, Nombre: {}, a las {}", nuevoCurso.getCursoId(), nuevoCurso.getNombre(), new java.util.Date());
        return nuevoCurso;
    }

    @Transactional
    public Curso actualizarCurso(Long cursoId, String nuevoNombre, String nuevaDescripcion) {
        Curso curso = cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con id: " + cursoId));

        logger.info("Actualizando curso ID: {}, a las {}", cursoId, new java.util.Date());

        // Verificar si ya existe otro curso con el mismo nombre en el mismo nivel
        if (!curso.getNombre().equalsIgnoreCase(nuevoNombre) &&
                cursoRepository.existsByNombreIgnoreCaseAndNivel(nuevoNombre, curso.getNivel())) {
            throw new RuntimeException("Ya existe un curso con el nombre " + nuevoNombre + " en el nivel " + curso.getNivel());
        }

        // Actualizar solo el nombre y la descripción
        curso.setNombre(nuevoNombre);
        curso.setDescripcion(nuevaDescripcion);

        logger.info("Curso actualizado: ID: {}, Nombre: {}, a las {}", curso.getCursoId(), curso.getNombre(), new java.util.Date());

        return cursoRepository.save(curso);
    }

    @Transactional
    public void eliminarCurso(Long cursoId) {
        Curso curso = obtenerCursoPorId(cursoId);
        cursoRepository.delete(curso);
        logger.info("Curso eliminado: ID: {}, Nombre: {}, a las {}", curso.getCursoId(), curso.getNombre(), new java.util.Date());
    }

    private void validarNivel(Nivel nivel) {
        if (nivel == null || (!nivel.equals(Nivel.PRIMARIA) && !nivel.equals(Nivel.SECUNDARIA))) {
            throw new IllegalArgumentException("Nivel inválido. Debe ser PRIMARIA o SECUNDARIA.");
        }
    }
}
