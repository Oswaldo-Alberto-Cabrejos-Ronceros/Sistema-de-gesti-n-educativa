package utp.edu.pe.Integrador_Backend.Service;

import org.apache.velocity.exception.ResourceNotFoundException;
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

    public List<Curso> listarCursos() {
        return cursoRepository.findAll();
    }

    public Curso obtenerCursoPorId(Long cursoId) {
        return cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con id: " + cursoId));
    }

    @Transactional
    public Curso crearCurso(Curso curso) {
        validarNivel(curso.getNivel());  // Validar el nivel antes de guardar
        return cursoRepository.save(curso);
    }

    @Transactional
    public Curso actualizarCurso(Long cursoId, Curso cursoActualizado) {
        Curso curso = obtenerCursoPorId(cursoId);
        curso.setNombreCurso(cursoActualizado.getNombreCurso());
        curso.setDescripcion(cursoActualizado.getDescripcion());
        curso.setNivel(cursoActualizado.getNivel());
        return cursoRepository.save(curso);
    }

    @Transactional
    public void eliminarCurso(Long cursoId) {
        Curso curso = obtenerCursoPorId(cursoId);
        cursoRepository.delete(curso);
    }

    private void validarNivel(Nivel nivel) {
        if (nivel == null || (!nivel.equals(Nivel.PRIMARIA) && !nivel.equals(Nivel.SECUNDARIA))) {
            throw new IllegalArgumentException("Nivel inválido. Debe ser PRIMARIA o SECUNDARIA.");
        }
    }
}
