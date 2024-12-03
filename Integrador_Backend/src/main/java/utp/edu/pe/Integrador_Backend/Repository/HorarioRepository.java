package utp.edu.pe.Integrador_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utp.edu.pe.Integrador_Backend.Entidades.Horario;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;

import java.util.Optional;
@Repository
public interface HorarioRepository  extends JpaRepository<Horario, Long> {
    Optional<Horario> findByNivelAndGradoAndSeccion(Nivel nivel, int grado, String seccion);

}
