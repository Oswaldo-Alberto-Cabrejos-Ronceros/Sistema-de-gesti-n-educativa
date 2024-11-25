package utp.edu.pe.Integrador_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Profesor;

import java.util.List;
import java.util.Optional;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {

    boolean existsByCodigo(String codigo);

    List<Profesor> findByNivel(Nivel nivel);

    boolean existsByDni(String dni);

    // metodo para buscar profesores cuyo DNI comience con un patron
    List<Profesor> findByDniStartingWith(String dni);
    // Metodo para buscar profesor por su código
    Optional<Profesor> findByCodigo(String codigo);
}
