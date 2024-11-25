package utp.edu.pe.Integrador_Backend.Service;



import jakarta.transaction.Transactional;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import utp.edu.pe.Integrador_Backend.Entidades.*;
import utp.edu.pe.Integrador_Backend.Repository.AsignacionProfesorRepository;
import utp.edu.pe.Integrador_Backend.Repository.ProfesorRepository;
import java.security.SecureRandom;
import java.util.List;
import java.util.Random;


@Service
public class ProfesorService {

    @Autowired
    private ProfesorRepository profesorRepository;
    @Autowired
    private AsignacionProfesorRepository asignacionProfesorRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProfesorService.class);

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Random random = new SecureRandom();

    // Listar todos los profesores
    public List<Profesor> listarProfesores() {
        return profesorRepository.findAll();
    }

    // Crear un nuevo profesor
    @Transactional
    public Profesor crearProfesor(Profesor profesor) {
        logger.info("Creando profesor: {}, Especialidad: {}, Nivel: {} a las {}", profesor.getNombre(), profesor.getEspecialidad(), profesor.getNivel(), new java.util.Date());

        // Hashear la contraseña con BCrypt
        profesor.setPassword(profesor.getDni());
        String hashedPassword = passwordEncoder.encode(profesor.getPassword());
        profesor.setPassword(hashedPassword);

        String codigo = generarCodigoUnico();
        profesor.setCodigo(codigo);
        profesor.setRol(Rol.PROFESOR);

        Profesor nuevoProfesor = profesorRepository.save(profesor);
        logger.info("Profesor creado: ID: {}, Nombre: {}, a las {}", nuevoProfesor.getUsuarioId(), nuevoProfesor.getNombre(), new java.util.Date());

        return nuevoProfesor;
    }

    // Metodo para generar el codigo onico para el profesor
    private String generarCodigoUnico() {
        String codigo;
        do {
            codigo = "P2" + generarNumerosAleatorios(7);
        } while (profesorRepository.existsByCodigo(codigo));
        return codigo;
    }

    // Metodo para generar numeros aleatorios
    private String generarNumerosAleatorios(int longitud) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < longitud; i++) {
            int numero = random.nextInt(10); // Generar un número entre 0 y 9
            sb.append(numero);
        }
        return sb.toString();
    }

    // Obtener profesor por ID
    public Profesor obtenerProfesorPorId(Long id) {
        return profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con id: " + id));
    }

    // Obtener profesor por Nivel
    public List<Profesor> ListarProfesorPorNivel(Nivel nivel) {
        return profesorRepository.findByNivel(nivel);
    }

    // Obtener profesor por DNI
    public List<Profesor> buscarProfesoresPorDniPrefix(String dni) {
        return profesorRepository.findByDniStartingWith(dni);
    }

    // Actualizar solo el teléfono y/o la contraseña del profesor
    @Transactional
    public Profesor actualizarProfesor(Long id, String nuevoTelefono, String nuevaPassword) {
        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con id: " + id));

        if (nuevoTelefono != null && !nuevoTelefono.isEmpty()) {
            profesor.setTelefono(nuevoTelefono);
        }

        if (nuevaPassword != null && !nuevaPassword.isEmpty()) {
            // Hashear la nueva contraseña con BCrypt
            String hashedPassword = passwordEncoder.encode(nuevaPassword);
            profesor.setPassword(hashedPassword);
        }

        return profesorRepository.save(profesor);
    }

    @Transactional
    public void eliminarProfesor(Long id) {
        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con id: " + id));
        profesorRepository.delete(profesor);

        logger.info("Profesor eliminado: ID: {}, Nombre: {}, a las {}", profesor.getUsuarioId(), profesor.getNombre(), new java.util.Date());
    }

    @Transactional
    public Profesor actualizarTodosLosDatosProfesor(Long id, Profesor profesorRequest) {
        Profesor profesor = profesorRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profesor no encontrado con id: " + id));

        // Verificar si el DNI es nuevo y si ya existe en la base de datos
        if (profesorRequest.getDni() != null && !profesorRequest.getDni().equals(profesor.getDni())) {
            if (profesorRepository.existsByDni(profesorRequest.getDni())) {
                throw new IllegalArgumentException("El DNI proporcionado ya está registrado.");
            }
            profesor.setDni(profesorRequest.getDni());
        }

        // Actualizar los campos
        profesor.setNombre(profesorRequest.getNombre());
        profesor.setApellido(profesorRequest.getApellido());
        profesor.setTelefono(profesorRequest.getTelefono());
        profesor.setEspecialidad(profesorRequest.getEspecialidad());

        // Actualizar la contraseña si está en la solicitud
        if (profesorRequest.getPassword() != null && !profesorRequest.getPassword().isEmpty()) {
            String hashedPassword = passwordEncoder.encode(profesorRequest.getPassword());
            profesor.setPassword(hashedPassword);
        }

        return profesorRepository.save(profesor);
    }

}
