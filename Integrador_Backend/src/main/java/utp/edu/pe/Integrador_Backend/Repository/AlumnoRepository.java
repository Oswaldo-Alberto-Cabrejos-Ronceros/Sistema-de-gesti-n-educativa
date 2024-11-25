package utp.edu.pe.Integrador_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
    List<Alumno> findByNivel(Nivel nivel);
    List<Alumno> findByGrado(Integer grado);
    List<Alumno> findBySeccion(String seccion);
    List<Alumno> findByGradoAndNivel(Integer grado, Nivel nivel);
    List<Alumno> findByGradoAndSeccion(Integer grado, String seccion);
    List<Alumno> findByNivelAndSeccion(Nivel nivel, String seccion);
    List<Alumno> findByNivelAndGradoAndSeccion(Nivel nivel, Integer grado, String seccion);
    List<Alumno> findAll();

    boolean existsByDni(String dni);
    List<Alumno> findByDniStartingWith(String dni);

    //buscar alumno por su código
    Optional<Alumno> findByCodigo(String codigo);

    boolean existsByCodigo(String codigo);
    long countByGradoAndNivel(Integer grado, Nivel nivel);

    // filtrar alumnos por grado y subcurso
      List<Alumno>findByGradoAndAsignaciones_Subcurso_SubcursoIdOrderByApellidoAsc(Integer grado, Long subcursoId);


}
