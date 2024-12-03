package utp.edu.pe.Integrador_Backend.Authentication;

import lombok.Data;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.Nivel;
import utp.edu.pe.Integrador_Backend.Entidades.Profesor;
import utp.edu.pe.Integrador_Backend.Entidades.Usuario;
@Data
public class AuthResponse {

    private String jwt;
    private Long usuarioId;
    private String nombre;
    private String apellido;
    private String dni;
    private String telefono;
    private String codigo;
    private String rol;

    // Campos específicos de Alumno
    private Integer grado;
    private String seccion;
    private Nivel nivel;

    // Campos específicos de Profesor
    private String especialidad;

    // Campo para indicar si el usuario debe cambiar la contraseña
    private boolean debeCambiarPassword;

    // Constructor general para datos comunes
    public AuthResponse(String jwt, Usuario usuario) {
        this.jwt = jwt;
        this.usuarioId = usuario.getUsuarioId();
        this.nombre = usuario.getNombre();
        this.apellido = usuario.getApellido();
        this.dni = usuario.getDni();
        this.telefono = usuario.getTelefono();
        this.codigo = usuario.getCodigo();
        this.rol = usuario.getRol().name();  // Convertir enum Rol a String
    }

    // Constructor para Alumno
    public AuthResponse(String jwt, Alumno alumno) {
        this(jwt, (Usuario) alumno);  // Llamada al constructor base para datos comunes
        this.grado = alumno.getGrado();
        this.seccion = alumno.getSeccion();
        this.nivel = alumno.getNivel();
    }

    // Constructor para Profesor
    public AuthResponse(String jwt, Profesor profesor) {
        this(jwt, (Usuario) profesor);  // Llamada al constructor base para datos comunes
        this.especialidad = profesor.getEspecialidad();
        this.nivel = profesor.getNivel();  // Nivel también es específico del profesor
    }
}
