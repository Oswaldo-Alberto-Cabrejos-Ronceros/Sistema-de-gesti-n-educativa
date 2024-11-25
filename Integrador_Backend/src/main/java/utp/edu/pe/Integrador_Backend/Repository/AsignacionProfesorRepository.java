package utp.edu.pe.Integrador_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import utp.edu.pe.Integrador_Backend.Entidades.AsignacionProfesor;
import utp.edu.pe.Integrador_Backend.Entidades.Profesor;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;

import java.util.List;
import java.util.Optional;

public interface AsignacionProfesorRepository extends JpaRepository<AsignacionProfesor, Long> {

    // Verificar si un subcurso ya está asignado a otro profesor
    boolean existsBySubcurso_SubcursoId(Long subcursoId);

    void deleteBySubcurso(Subcurso subcurso);


    // Metodo para buscar asignaciones por el ID del profesor
    List<AsignacionProfesor> findByProfesor_UsuarioId(Long usuarioId);


    // Obtener el profesor que tiene asignado un subcurso
    Optional<AsignacionProfesor> findBySubcurso_SubcursoId(Long subcursoId);

    List<AsignacionProfesor> findByProfesor(Profesor profesor);
}
