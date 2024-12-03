package utp.edu.pe.Integrador_Backend.Service;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utp.edu.pe.Integrador_Backend.Entidades.*;
import utp.edu.pe.Integrador_Backend.Repository.AlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.AsignacionAlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.NotaRepository;
import utp.edu.pe.Integrador_Backend.Repository.SubcursoRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotaService {

    @Autowired
    private NotaRepository notaRepository;

    @Autowired
    private AsignacionAlumnoRepository asignacionAlumnoRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private SubcursoRepository subcursoRepository;

        //LOOGBAK
    private static final Logger logger = LoggerFactory.getLogger(NotaService.class);

    @Transactional
    public Nota registrarCalificacion(Long usuarioId , Long subcursoId, Integer unidad, Integer calificacionNumero, Double calificacion) {
        Alumno alumno = alumnoRepository.findById(usuarioId )
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + usuarioId ));
        Subcurso subcurso = subcursoRepository.findById(subcursoId)
                .orElseThrow(() -> new ResourceNotFoundException("Subcurso no encontrado con id: " + subcursoId));

        Nota nuevaNota = new Nota();
        nuevaNota.setAlumno(alumno);
        nuevaNota.setSubcurso(subcurso);
        nuevaNota.setUnidad(unidad);
        nuevaNota.setCalificacion(calificacion);
        nuevaNota.setCalificacionNumero(calificacionNumero);

        return notaRepository.save(nuevaNota);
    }

    @Transactional(readOnly = true)
    public List<Nota> obtenerNotasPorAlumnoYUnidad(Long subcursoId, Integer unidad, Long usuarioId) {
        return notaRepository.findBySubcurso_SubcursoIdAndUnidadAndAlumno_UsuarioId(subcursoId, unidad, usuarioId);
    }


    @Transactional(readOnly = true)
    public Double obtenerCalificacionEspecificaPorAlumnoSubcursoUnidadYCalificacionNumero(
            Long alumnoId, Long subcursoId, Integer unidad, Integer calificacionNumero) {
        Nota nota = notaRepository.findFirstByAlumno_UsuarioIdAndSubcurso_SubcursoIdAndUnidadAndCalificacionNumero(
                alumnoId, subcursoId, unidad, calificacionNumero);
        if (nota != null) {
            return nota.getCalificacion();
        } else {
            return null;
        }
    }

    @Transactional(readOnly = true)
    public Double calcularPromedioPorUnidad(Long usuarioId , Long subcursoId, Integer unidad) {
        List<Nota> notas = notaRepository.findByAlumnoUsuarioIdAndSubcursoIdAndUnidad(usuarioId , subcursoId, unidad);
        if (notas.isEmpty()) {
            return null;
        }
        return notas.stream().mapToDouble(Nota::getCalificacion).average().orElse(0.0);
    }

    @Transactional(readOnly = true)
    public Double calcularPromedioBimestral(Long usuarioId, Long subcursoId, Integer bimestre) {
        int unidad1 = (bimestre - 1) * 2 + 1;
        int unidad2 = unidad1 + 1;

        Double promedioUnidad1 = calcularPromedioPorUnidad(usuarioId, subcursoId, unidad1);
        Double promedioUnidad2 = calcularPromedioPorUnidad(usuarioId, subcursoId, unidad2);

        List<Double> promediosUnidades = new ArrayList<>();
        if (promedioUnidad1 != null) promediosUnidades.add(promedioUnidad1);
        if (promedioUnidad2 != null) promediosUnidades.add(promedioUnidad2);

        if (!promediosUnidades.isEmpty()) {
            return promediosUnidades.stream().mapToDouble(Double::doubleValue).average().orElse(0.0);
        } else {
            return null; // Indica que no hay promedio para este bimestre
        }
    }

    @Transactional(readOnly = true)
    public Double calcularPromedioFinalDelCurso(Long usuarioId, Long cursoId) {
        List<Subcurso> subcursos = subcursoRepository.findByCurso_CursoId(cursoId);
        double totalPromediosBimestrales = 0.0;
        int totalBimestresContados = 0;

        for (Subcurso subcurso : subcursos) {
            for (int bimestre = 1; bimestre <= 4; bimestre++) {
                Double promedioBimestral = calcularPromedioBimestral(usuarioId, subcurso.getSubcursoId(), bimestre);
                if (promedioBimestral != null) { // Solo suma bimestres con promedio
                    totalPromediosBimestrales += promedioBimestral;
                    totalBimestresContados++;
                }
            }
        }

        return totalBimestresContados > 0 ? totalPromediosBimestrales / totalBimestresContados : null;
    }

////////////////////// METODO  RELACIONADO AL CUADOR DE HONOR  ///////////////////
public List<AlumnoPromedio> listarAlumnosPorGradoNivelConMayorPromedio(Integer grado, Nivel nivel) {
    List<Alumno> alumnos = alumnoRepository.findByGradoAndNivel(grado, nivel);

    List<AlumnoPromedio> alumnosConPromedio = new ArrayList<>();

    for (Alumno alumno : alumnos) {
        List<Subcurso> subcursos = subcursoRepository.findSubcursosByAlumnoId(alumno.getUsuarioId());

        double totalPromedio = 0.0;
        int cursosContados = 0;

        for (Subcurso subcurso : subcursos) {
            Double promedioCurso = calcularPromedioFinalDelCurso(alumno.getUsuarioId(), subcurso.getCurso().getCursoId());
            if (promedioCurso != null) {
                totalPromedio += promedioCurso;
                cursosContados++;
            }
        }

        double promedioHonor = cursosContados > 0 ? totalPromedio / cursosContados : null;

        alumnosConPromedio.add(new AlumnoPromedio(alumno, promedioHonor));
    }

    // Filtrar alumnos que no tienen promedio
    alumnosConPromedio = alumnosConPromedio.stream()
            .filter(ap -> ap.getPromedio() != null)
            .collect(Collectors.toList());

    alumnosConPromedio.sort(Comparator.comparing(AlumnoPromedio::getPromedio).reversed());
    return alumnosConPromedio;
}

    // Clase interna para almacenar alumno y su promedio
    public static class AlumnoPromedio {
        private Alumno alumno;
        private Double promedio;

        public AlumnoPromedio(Alumno alumno, Double promedio) {
            this.alumno = alumno;
            this.promedio = promedio;
        }

        public Alumno getAlumno() {
            return alumno;
        }

        public Double getPromedio() {
            return promedio;
        }
    }
}
