package utp.edu.pe.Integrador_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.Nota;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;

import java.util.List;

@Repository
public interface NotaRepository  extends JpaRepository<Nota, Long> {

    // Encontrar notas por alumno y subcurso
    List<Nota> findByAlumnoAndSubcurso(Alumno alumno, Subcurso subcurso);


    Nota findFirstByAlumno_UsuarioIdAndSubcurso_SubcursoIdAndUnidadAndCalificacionNumero(
            Long alumnoId, Long subcursoId, Integer unidad, Integer calificacionNumero);


    @Query("SELECT n FROM Nota n WHERE n.alumno.usuarioId = :usuarioId AND n.subcurso.subcursoId = :subcursoId AND n.unidad = :unidad")
    List<Nota> findByAlumnoUsuarioIdAndSubcursoIdAndUnidad(@Param("usuarioId") Long usuarioId, @Param("subcursoId") Long subcursoId, @Param("unidad") Integer unidad);


    List<Nota> findBySubcurso_SubcursoIdAndUnidadAndAlumno_UsuarioId(Long subcursoId, Integer unidad, Long usuarioId);


    // Encontrar notas por subcurso
    List<Nota> findBySubcurso(Subcurso subcurso);
}
