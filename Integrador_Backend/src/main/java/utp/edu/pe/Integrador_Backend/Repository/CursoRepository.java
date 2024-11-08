package utp.edu.pe.Integrador_Backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utp.edu.pe.Integrador_Backend.Entidades.Curso;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;

import java.util.List;

@Repository
public interface CursoRepository  extends JpaRepository<Curso, Long> {

    List<Curso> findByNivel(Nivel nivel);

    boolean existsByNombreIgnoreCaseAndNivel(String nombre, Nivel nivel);
}
