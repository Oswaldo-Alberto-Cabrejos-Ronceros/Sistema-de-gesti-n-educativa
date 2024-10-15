package utp.edu.pe.Integrador_Backend.Service;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utp.edu.pe.Integrador_Backend.Entidades.Curso;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;
import utp.edu.pe.Integrador_Backend.Repository.CursoRepository;
import utp.edu.pe.Integrador_Backend.Repository.SubcursoRepository;

import java.util.List;

@Service
public class SubcursoService {
    @Autowired
    private SubcursoRepository subcursoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    public List<Subcurso> listarSubcursos() {
        return subcursoRepository.findAll();
    }

    @Transactional
    public Subcurso crearSubcurso(Long cursoId, Subcurso subcurso){
        Curso curso =cursoRepository.findById(cursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Curso no encontrado con id: " + cursoId));
        subcurso.setCurso(curso);
        return subcursoRepository.save(subcurso);
    }

    public Subcurso obtenerSubcursoPorId(Long subcursoId) {
        return subcursoRepository.findById(subcursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Subcurso no encontrado con id: " + subcursoId));
    }

}
