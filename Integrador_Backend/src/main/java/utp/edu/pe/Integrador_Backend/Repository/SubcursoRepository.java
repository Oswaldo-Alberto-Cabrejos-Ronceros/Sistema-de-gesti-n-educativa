package utp.edu.pe.Integrador_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;

import java.util.List;

@Repository
public interface SubcursoRepository extends JpaRepository<Subcurso, Long> {
    List<Subcurso> findByNivel(Nivel nivel);
    List<Subcurso> findByCurso_CursoId(Long cursoId);

    // Metodo para obtener subcursos asignados a un alumno por su ID
    @Query("SELECT s FROM Subcurso s JOIN s.asignacionesAlumno aa WHERE aa.alumno.usuarioId = :usuarioId")
    List<Subcurso> findSubcursosByAlumnoId(@Param("usuarioId") Long usuarioId);
    // Metodo para obtener subcursos asignados a un profesor por su ID
    @Query("SELECT s FROM Subcurso s JOIN s.asignacionesProfesor ap WHERE ap.profesor.usuarioId = :usuarioId")
    List<Subcurso> findSubcursosByProfesorId(@Param("usuarioId") Long usuarioId);
    

    boolean existsByNombreIgnoreCaseAndNivel(String nombre, Nivel nivel);
}
