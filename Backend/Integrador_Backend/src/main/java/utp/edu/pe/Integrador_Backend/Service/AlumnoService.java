package utp.edu.pe.Integrador_Backend.Service;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.AsignacionAlumno;
import utp.edu.pe.Integrador_Backend.Entidades.Rol;
import utp.edu.pe.Integrador_Backend.Entidades.Subcurso;
import utp.edu.pe.Integrador_Backend.Repository.AlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.AsignacionAlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.SubcursoRepository;

import java.security.SecureRandom;
import java.util.List;
import java.util.Random;

@Service
public class AlumnoService {
    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private SubcursoRepository subcursoRepository;

    @Autowired
    private AsignacionAlumnoRepository asignacionAlumnoRepository;
    private final Random random = new SecureRandom();


    public List<Alumno> listarAlumnos() {
        return alumnoRepository.findAll();
    }

    @Transactional
    public Alumno crearAlumno(Alumno alumno) {
        alumno.setPassword(alumno.getDni());

        // Generar el código único del alumno
        String codigo = generarCodigoUnico();
        alumno.setCodigo(codigo);

        // Asignar la sección (A o B) basado en el número de alumnos en el grado y nivel
        asignarSeccion(alumno);
        alumno.setRol(Rol.STUDENT);
        Alumno nuevoAlumno = alumnoRepository.save(alumno);
        // Asignar subcursos por nivel
        asignarSubcursosPorNivel(nuevoAlumno);
        return nuevoAlumno;
    }

    // Método para generar el código único
    private String generarCodigoUnico() {
        String codigo;
        do {
            codigo = "A2" + generarNumerosAleatorios(7);
        } while (alumnoRepository.existsByCodigo(codigo));
        return codigo;
    }

    // Método para generar números aleatorios con la longitud especificada
    private String generarNumerosAleatorios(int longitud) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < longitud; i++) {
            int numero = random.nextInt(10); // 0-9
            sb.append(numero);
        }
        return sb.toString();
    }

    // Método para asignar la sección al alumno
    private void asignarSeccion(Alumno alumno) {
        long numeroAlumnosEnSeccion = alumnoRepository.countByGradoAndNivel(alumno.getGrado(), alumno.getNivel());
        if (numeroAlumnosEnSeccion < 35) {
            alumno.setSeccion("A");
        } else {
            alumno.setSeccion("B");
        }
    }

    // Método para actualizar el teléfono y/o contraseña del alumno
    @Transactional
    public Alumno actualizarAlumno(Long id, String nuevoTelefono, String nuevaPassword) {
        Alumno alumno = alumnoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Alumno no encontrado con id: " + id));

        if (nuevoTelefono != null && !nuevoTelefono.isEmpty()) {
            alumno.setTelefono(nuevoTelefono);
        }

        if (nuevaPassword != null && !nuevaPassword.isEmpty()) {
            // Aplicar hashing con Argon2
            Argon2 argon2 = Argon2Factory.create();
            char[] passwordChars = nuevaPassword.toCharArray();
            String hash = argon2.hash(2, 65536, 1, passwordChars);
            alumno.setPassword(hash);
            // Limpiar el arreglo de caracteres de la memoria
            argon2.wipeArray(passwordChars);
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

}
