package utp.edu.pe.Integrador_Backend.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utp.edu.pe.Integrador_Backend.Entidades.Contenido;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;

import java.util.List;

@Repository
public interface ContenidoRepository extends JpaRepository<Contenido, Long> {

    // Buscar contenidos por nivel, grado, subcurso y unidad
    List<Contenido> findByNivelAndGradoAndSubcursoAndUnidad(
            Nivel nivel, int grado, Subcurso subcurso, int unidad);
}
