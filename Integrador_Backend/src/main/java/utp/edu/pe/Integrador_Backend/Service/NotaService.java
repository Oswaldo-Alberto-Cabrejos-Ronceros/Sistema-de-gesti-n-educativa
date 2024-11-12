package utp.edu.pe.Integrador_Backend.Service;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Nota;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;
import utp.edu.pe.Integrador_Backend.Repository.AlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.AsignacionAlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.NotaRepository;
import utp.edu.pe.Integrador_Backend.Repository.SubcursoRepository;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

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
    public Double calcularPromedioPorUnidad(Long usuarioId , Long subcursoId, Integer unidad) {
        List<Nota> notas = notaRepository.findByAlumnoUsuarioIdAndSubcursoIdAndUnidad(usuarioId , subcursoId, unidad);
        return notas.stream().mapToDouble(Nota::getCalificacion).average().orElse(0.0);
    }
    @Transactional(readOnly = true)
    public Double calcularPromedioBimestral(Long usuarioId, Long subcursoId, Integer bimestre) {
        int unidad1 = (bimestre - 1) * 2 + 1;
        int unidad2 = unidad1 + 1;

        Double promedioUnidad1 = calcularPromedioPorUnidad(usuarioId, subcursoId, unidad1);
        Double promedioUnidad2 = calcularPromedioPorUnidad(usuarioId, subcursoId, unidad2);

        if (promedioUnidad1 != null && promedioUnidad2 != null) {
            return (promedioUnidad1 + promedioUnidad2) / 2;
        } else if (promedioUnidad1 != null) {
            return promedioUnidad1;
        } else if (promedioUnidad2 != null) {
            return promedioUnidad2;
        } else {
            return 0.0; // Si ambas están vacías
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
                if (promedioBimestral != 0.0) { // Solo suma bimestres con promedio
                    totalPromediosBimestrales += promedioBimestral;
                    totalBimestresContados++;
                }
            }
        }

        return totalBimestresContados > 0 ? totalPromediosBimestrales / totalBimestresContados : 0.0;
    }
    ////////////////////// METODO  RELACIONADO AL CUADOR DE HONOR  ///////////////////
    @Transactional(readOnly = true)
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

            double promedioHonor = cursosContados > 0 ? totalPromedio / cursosContados : 0.0;

            alumnosConPromedio.add(new AlumnoPromedio(alumno, promedioHonor));
        }

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
