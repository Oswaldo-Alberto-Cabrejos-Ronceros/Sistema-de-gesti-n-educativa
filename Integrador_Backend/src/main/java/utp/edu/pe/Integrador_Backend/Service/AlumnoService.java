package utp.edu.pe.Integrador_Backend.Service;


import org.apache.velocity.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utp.edu.pe.Integrador_Backend.Entidades.*;
import utp.edu.pe.Integrador_Backend.Repository.AlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.AsignacionAlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.SubcursoRepository;
import java.security.SecureRandom;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private SubcursoRepository subcursoRepository;

    @Autowired
    private AsignacionAlumnoRepository asignacionAlumnoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Random random = new SecureRandom();

    private static final Logger logger = LoggerFactory.getLogger(AlumnoService.class);


    public List<Alumno> listarAlumnos() {
        return alumnoRepository.findAll();
    }

    public List<Alumno> obtenerAlumnosPorGradoYSubcurso(Integer grado, Long subcursoId) {
        return alumnoRepository.findByGradoAndAsignaciones_Subcurso_SubcursoIdOrderByApellidoAsc(grado, subcursoId);
    }

    public List<Alumno> buscarAlumnosPorDNI(String dni) {
        List<Alumno> alumnos = alumnoRepository.findByDniStartingWith(dni);
        if (alumnos.isEmpty()) {
            throw new RuntimeException("No hay alumnos con el DNI proporcionado.");
        }
        return alumnos;
    }


    public List<Alumno> buscarAlumnos(Nivel nivel, Integer grado, String seccion) {
        List<Alumno> alumnos;

        try {
            if (nivel != null && grado != null && seccion != null) {
                // Filtrar por nivel, grado y sección
                alumnos = alumnoRepository.findByNivelAndGradoAndSeccion(nivel, grado, seccion);
                if (alumnos.isEmpty()) {
                    throw new RuntimeException("No hay alumnos en el grado " + grado + " - sección " + seccion + " para el nivel " + nivel);
                }
            } else if (nivel != null && grado != null) {
                // Filtrar por nivel y grado
                alumnos = alumnoRepository.findByGradoAndNivel(grado, nivel);
                if (alumnos.isEmpty()) {
                    throw new RuntimeException("No hay alumnos en el grado " + grado + " para el nivel " + nivel);
                }
            } else if (grado != null && seccion != null) {
                // Filtrar por grado y sección
                alumnos = alumnoRepository.findByGradoAndSeccion(grado, seccion);
                if (alumnos.isEmpty()) {
                    throw new RuntimeException("No hay alumnos en el grado " + grado + " - sección " + seccion);
                }
            } else if (nivel != null && seccion != null) {
                // Filtrar por nivel y sección
                alumnos = alumnoRepository.findByNivelAndSeccion(nivel, seccion);
                if (alumnos.isEmpty()) {
                    throw new RuntimeException("No hay alumnos en la sección " + seccion + " para el nivel " + nivel);
                }
            } else if (nivel != null) {
                // Filtrar solo por nivel
                alumnos = alumnoRepository.findByNivel(nivel);
                if (alumnos.isEmpty()) {
                    throw new RuntimeException("No hay alumnos para el nivel " + nivel);
                }
            } else if (grado != null) {
                // Filtrar solo por grado
                alumnos = alumnoRepository.findByGrado(grado);
                if (alumnos.isEmpty()) {
                    throw new RuntimeException("No hay alumnos en el grado " + grado);
                }
            } else if (seccion != null) {
                // Filtrar solo por sección
                alumnos = alumnoRepository.findBySeccion(seccion);
                if (alumnos.isEmpty()) {
                    throw new RuntimeException("No hay alumnos en la sección " + seccion);
                }
            } else {
                // Obtener todos los alumnos si no hay filtros
                alumnos = alumnoRepository.findAll();
                if (alumnos.isEmpty()) {
                    throw new RuntimeException("No hay alumnos registrados.");
                }
            }
        } catch (RuntimeException e) {
            throw new RuntimeException(e.getMessage());
        }

        return alumnos;
    }


    public List<Nota> obtenerNotasPorAlumno(Long usuarioId) {
        Alumno alumno = alumnoRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + usuarioId));
        return alumno.getNotas().stream().toList();
    }

    @Transactional
    public List<Nota> obtenerNotasPorAlumnoYSubcurso(Long usuarioId, Long subcursoId) {
        Alumno alumno = alumnoRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + usuarioId));

        return alumno.getNotas().stream()
                .filter(nota -> nota.getSubcurso().getSubcursoId().equals(subcursoId))
                .collect(Collectors.toList());
    }

    @Transactional
    public Alumno crearAlumno(Alumno alumno) {
        alumno.setPassword(alumno.getDni());

        // Hashear la contraseña con BCrypt
        String hashedPassword = passwordEncoder.encode(alumno.getPassword());
        alumno.setPassword(hashedPassword);

        String codigo = generarCodigoUnico();
        alumno.setCodigo(codigo);

        // Asignar la sección (A o B) basado en el número de alumnos en el grado y nivel
        asignarSeccion(alumno);
        alumno.setRol(Rol.STUDENT);

        Alumno nuevoAlumno = alumnoRepository.save(alumno);
        //registrar evento en el logg
        logger.info("Alumno creado: {}, ID: {}, Fecha: {}", nuevoAlumno.getNombre(), nuevoAlumno.getUsuarioId(), new java.util.Date());

        asignarSubcursosPorNivel(nuevoAlumno);
        return nuevoAlumno;
    }

    // metodo para generar el codigo unico
    private String generarCodigoUnico() {
        String codigo;
        do {
            codigo = "A2" + generarNumerosAleatorios(7);
        } while (alumnoRepository.existsByCodigo(codigo));
        return codigo;
    }

    // metodo para generar numeros aleatorios con la longitud especificada
    private String generarNumerosAleatorios(int longitud) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < longitud; i++) {
            int numero = random.nextInt(10); // 0-9
            sb.append(numero);
        }
        return sb.toString();
    }

    // metodo para asignar la sección al alumno
    private void asignarSeccion(Alumno alumno) {
        long numeroAlumnosEnSeccion = alumnoRepository.countByGradoAndNivel(alumno.getGrado(), alumno.getNivel());
        if (numeroAlumnosEnSeccion < 35) {
            alumno.setSeccion("A");
        } else {
            alumno.setSeccion("B");
        }
    }

    // metodo para actualizar el teléfono y/o contraseña del alumno
    @Transactional
    public Alumno actualizarAlumno(Long id, String nuevoTelefono, String nuevaPassword) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + id));

        if (nuevoTelefono != null && !nuevoTelefono.isEmpty()) {
            alumno.setTelefono(nuevoTelefono);
        }

        if (nuevaPassword != null && !nuevaPassword.isEmpty()) {
            // Hashear la nueva contraseña con BCrypt
            String hashedPassword = passwordEncoder.encode(nuevaPassword);
            alumno.setPassword(hashedPassword);
        }

        return alumnoRepository.save(alumno);
    }



    private void asignarSubcursosPorNivel(Alumno alumno) {
        // Obtener subcursos del nivel del alumno
        List<Subcurso> subcursos = subcursoRepository.findByNivel(alumno.getNivel());

        for (Subcurso subcurso : subcursos) {
            AsignacionAlumno asignacion = new AsignacionAlumno();
            asignacion.setAlumno(alumno);
            asignacion.setSubcurso(subcurso);
            asignacionAlumnoRepository.save(asignacion);
        }
    }


    @Transactional
    public void eliminarAlumno(Long id) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + id));
        alumnoRepository.delete(alumno);
        logger.info("Alumno eliminado con id {} a las {}", id, new java.util.Date());
    }


    @Transactional
    public Alumno actualizarTodosLosDatosAlumno(Long id, Alumno alumnoRequest) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + id));

        // Verificar si el DNI es nuevo y si ya existe en la base de datos
        if (alumnoRequest.getDni() != null && !alumnoRequest.getDni().equals(alumno.getDni())) {
            if (alumnoRepository.existsByDni(alumnoRequest.getDni())) {
                throw new IllegalArgumentException("El DNI proporcionado ya está registrado.");
            }
            alumno.setDni(alumnoRequest.getDni());
        }

        // Actualizar los campos
        alumno.setNombre(alumnoRequest.getNombre());
        alumno.setApellido(alumnoRequest.getApellido());
        alumno.setTelefono(alumnoRequest.getTelefono());
        alumno.setFechaNacimiento(alumnoRequest.getFechaNacimiento());

        // Actualizar la contraseña si está en la solicitud
        if (alumnoRequest.getPassword() != null && !alumnoRequest.getPassword().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(alumnoRequest.getPassword());
            alumno.setPassword(hashedPassword);
        }

        return alumnoRepository.save(alumno);
    }
}
