package utp.edu.pe.Integrador_Backend.Service;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utp.edu.pe.Integrador_Backend.Entidades.Horario;
import utp.edu.pe.Integrador_Backend.Entidades.HorarioProfesor;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Profesor;
import utp.edu.pe.Integrador_Backend.Repository.HorarioProfesorRepository;
import utp.edu.pe.Integrador_Backend.Repository.HorarioRepository;
import utp.edu.pe.Integrador_Backend.Repository.ProfesorRepository;
import java.time.LocalDateTime;

@Service
public class HorarioService {

    @Autowired
    private S3Service s3Service;

    @Autowired
    private HorarioRepository horarioRepository;

    @Autowired
    private HorarioProfesorRepository horarioProfesorRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    ///////////////////////// METODOS PARA HORARIO ALUMNO////////////////////////////////


    public Horario guardarHorarioAlumno(String nivelStr, int grado, String seccion, String urlArchivo) {
        Nivel nivel = Nivel.valueOf(nivelStr.toUpperCase());

        // Buscar si ya existe un horario para ese nivel, grado y sección
        Horario horario = horarioRepository.findByNivelAndGradoAndSeccion(nivel, grado, seccion)
                .orElse(new Horario());

        // Si ya existe un horario con un archivo asociado, eliminarlo de S3
        if (horario.getUrlArchivo() != null) {
            s3Service.eliminarArchivo(horario.getUrlArchivo());
        }


        horario.setNivel(nivel);
        horario.setGrado(grado);
        horario.setSeccion(seccion);
        horario.setUrlArchivo(urlArchivo);
        horario.setFechaActualizacion(LocalDateTime.now());

        return horarioRepository.save(horario);
    }

    public Horario obtenerHorarioAlumno(String nivelStr, int grado, String seccion) {
        Nivel nivel = Nivel.valueOf(nivelStr.toUpperCase());
        return horarioRepository.findByNivelAndGradoAndSeccion(nivel, grado, seccion)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado"));
    }


    public void eliminarHorarioAlumno(Long id) {
        Horario horario = horarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado"));
        horarioRepository.delete(horario);

        // Eliminar archivo en S3
        if (horario.getUrlArchivo() != null) {
            s3Service.eliminarArchivo(horario.getUrlArchivo());
        }

        // Eliminar registro en la base de datos
        horarioRepository.delete(horario);
    }

    ///////////////////////// METODOS PARA HORARIO PROFESOR////////////////////////////////


    public HorarioProfesor guardarHorarioProfesor(Long usuarioId, String urlArchivo) {
        Profesor profesor = profesorRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con id: " + usuarioId));

        HorarioProfesor horarioProfesor = horarioProfesorRepository.findByProfesor_UsuarioId(usuarioId)
                .orElse(new HorarioProfesor());

        // Si ya existe un horario, eliminar el archivo antiguo de S3
        if (horarioProfesor.getUrlArchivo() != null) {
            s3Service.eliminarArchivo(horarioProfesor.getUrlArchivo());
        }

        horarioProfesor.setProfesor(profesor);
        horarioProfesor.setUrlArchivo(urlArchivo);
        horarioProfesor.setFechaActualizacion(LocalDateTime.now());

        if (horarioProfesor.getFechaCreacion() == null) {
            horarioProfesor.setFechaCreacion(LocalDateTime.now());
        }

        return horarioProfesorRepository.save(horarioProfesor);
    }

    @Transactional(readOnly = true)
    public HorarioProfesor obtenerHorarioProfesor(Long usuarioId) {
        return horarioProfesorRepository.findByProfesor_UsuarioId(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado para el profesor con id: " + usuarioId));
    }

    public void eliminarHorarioProfesor(Long usuarioId) {
        HorarioProfesor horarioProfesor = horarioProfesorRepository.findByProfesor_UsuarioId(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Horario no encontrado para el profesor con id: " + usuarioId));

        // Eliminar archivo en S3
        if (horarioProfesor.getUrlArchivo() != null) {
            s3Service.eliminarArchivo(horarioProfesor.getUrlArchivo());
        }

        // Eliminar registro en la base de datos
        horarioProfesorRepository.delete(horarioProfesor);
    }
}



