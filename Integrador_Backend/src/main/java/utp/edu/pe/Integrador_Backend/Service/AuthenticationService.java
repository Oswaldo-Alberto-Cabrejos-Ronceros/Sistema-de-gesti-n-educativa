package utp.edu.pe.Integrador_Backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import utp.edu.pe.Integrador_Backend.Authentication.AuthResponse;
import utp.edu.pe.Integrador_Backend.Authentication.JwtUtil;
import utp.edu.pe.Integrador_Backend.Authentication.LoginRequest;
import utp.edu.pe.Integrador_Backend.Entidades.Administrador;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.Profesor;
import utp.edu.pe.Integrador_Backend.Entidades.Usuario;
import utp.edu.pe.Integrador_Backend.Repository.AdministradorRepository;
import utp.edu.pe.Integrador_Backend.Repository.AlumnoRepository;
import utp.edu.pe.Integrador_Backend.Repository.ProfesorRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthenticationService {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private AdministradorRepository administradorRepository;


    // Este metodo carga el usuario por su nombre de usuario o código (correo/código)
    public UserDetails loadUserByUsername(String username) {
        Usuario usuario = obtenerUsuarioPorCorreoOCodigo(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        List<GrantedAuthority> authorityList = List.of(new SimpleGrantedAuthority(usuario.getRol().name()));

        return new org.springframework.security.core.userdetails.User(
                usuario.getCodigo(), usuario.getPassword(), authorityList);
    }

    public Optional<Usuario> obtenerUsuarioPorCorreoOCodigo(String username) {
        return administradorRepository.findByCodigo(username)
                .map(admin -> (Usuario) admin)
                .or(() -> profesorRepository.findByCodigo(username)
                        .map(profesor -> (Usuario) profesor))
                .or(() -> alumnoRepository.findByCodigo(username)
                        .map(alumno -> (Usuario) alumno));
    }


    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        UserDetails userDetails = loadUserByUsername(loginRequest.getUsername());
        Usuario usuario = obtenerUsuarioPorCorreoOCodigo(loginRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (passwordEncoder.matches(loginRequest.getPassword(), userDetails.getPassword())) {
            // Verificar si la contraseña es igual al DNI
            boolean isDefaultPassword = passwordEncoder.matches(usuario.getDni(), usuario.getPassword());

            // Generar token de acceso
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails.getUsername(), null, userDetails.getAuthorities());

            String accessToken = jwtUtil.createAccessToken(authentication);

            imprimirDatosUsuarioEnConsola(usuario);

            // Crear AuthResponse
            AuthResponse authResponse;
            if (usuario instanceof Alumno) {
                authResponse = new AuthResponse(accessToken, (Alumno) usuario);
            } else if (usuario instanceof Profesor) {
                authResponse = new AuthResponse(accessToken, (Profesor) usuario);
            } else {
                authResponse = new AuthResponse(accessToken, usuario); // Para Administrador
            }

            // Incluir flag para indicar si es necesario cambiar la contraseña
            authResponse.setDebeCambiarPassword(isDefaultPassword);

            // Imprimir si debe cambiar la contraseña
            System.out.println("Debe cambiar contraseña: " + isDefaultPassword);

            return authResponse;
        } else {
            throw new BadCredentialsException("Credenciales incorrectas");
        }
    }

    private void imprimirDatosUsuarioEnConsola(Usuario usuario) {
        // Imprimir los datos comunes
        System.out.println("Usuario autenticado: Nombre: " + usuario.getNombre() + ", Apellido: " + usuario.getApellido() +
                ", DNI: " + usuario.getDni() + ", Código: " + usuario.getCodigo() + ", Rol: " + usuario.getRol().name());

        // Si es Alumno, imprimir datos adicionales
        if (usuario instanceof Alumno) {
            Alumno alumno = (Alumno) usuario;
            System.out.println("Alumno: Grado: " + alumno.getGrado() + ", Sección: " + alumno.getSeccion() + ", Nivel: " + alumno.getNivel());
        }

        // Si es Profesor, imprimir datos adicionales
        if (usuario instanceof Profesor) {
            Profesor profesor = (Profesor) usuario;
            System.out.println("Profesor: Especialidad: " + profesor.getEspecialidad() + ", Nivel: " + profesor.getNivel());
        }

        // Si es Administrador, no hay datos adicionales
        if (usuario instanceof Administrador) {
            System.out.println("Administrador autenticado.");
        }

    }

}
