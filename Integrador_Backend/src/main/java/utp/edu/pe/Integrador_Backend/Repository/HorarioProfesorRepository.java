package utp.edu.pe.Integrador_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import utp.edu.pe.Integrador_Backend.Entidades.HorarioProfesor;

import java.util.Optional;

public interface HorarioProfesorRepository extends JpaRepository<HorarioProfesor, Long> {

    Optional<HorarioProfesor> findByProfesor_UsuarioId(Long usuarioId);

}
