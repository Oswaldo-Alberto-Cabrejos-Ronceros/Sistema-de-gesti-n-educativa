package utp.edu.pe.Integrador_Backend.Controller;

// Paquetes de JWT
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

// Paquetes de Jakarta Servlet
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Paquetes de Spring
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

// Tus clases personalizadas (asegúrate de que las rutas sean correctas)
import utp.edu.pe.Integrador_Backend.Authentication.AuthResponse;
import utp.edu.pe.Integrador_Backend.Authentication.JwtUtil;
import utp.edu.pe.Integrador_Backend.Authentication.LoginRequest;
import utp.edu.pe.Integrador_Backend.Entidades.Alumno;
import utp.edu.pe.Integrador_Backend.Entidades.Profesor;
import utp.edu.pe.Integrador_Backend.Entidades.Usuario;
import utp.edu.pe.Integrador_Backend.Service.AuthenticationService;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        AuthResponse authResponse = authenticationService.authenticateUser(loginRequest);

        // Generar el token de refresco usando el código del usuario
        String refreshToken = jwtUtil.createRefreshToken(authResponse.getCodigo());

        // Configurar la cookie HTTP-only con el token de refresco
        jakarta.servlet.http.Cookie refreshTokenCookie = new jakarta.servlet.http.Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setAttribute("SameSite", "Strict");//las cookies solo se envían cuando el usuario navega dentro de la app
        refreshTokenCookie.setSecure(false); // Cambiar a true en despligue si tenemos  HTTPS
        refreshTokenCookie.setPath("/auth/refresh"); // La ruta donde se enviará la cookie
        response.addCookie(refreshTokenCookie);

        // Devolver AuthResponse sin el token de refresco
        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(HttpServletRequest request) {
        // Obtener el token de refresco de la cookie
        String refreshToken = null;
        jakarta.servlet.http.Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (jakarta.servlet.http.Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null) {
            System.out.println("No se encontró el token de refresco en la cookie.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            DecodedJWT decodedJWT = jwtUtil.validateRefreshToken(refreshToken);
            String username = decodedJWT.getSubject();

            // Cargar detalles del usuario
            UserDetails userDetails = authenticationService.loadUserByUsername(username);

            // Generar un nuevo token de acceso
            Authentication authentication = new UsernamePasswordAuthenticationToken(
                    userDetails.getUsername(), null, userDetails.getAuthorities());

            String newAccessToken = jwtUtil.createAccessToken(authentication);

            // Crear un nuevo AuthResponse
            Usuario usuario = authenticationService.obtenerUsuarioPorCorreoOCodigo(username)
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

            AuthResponse newAuthResponse;
            if (usuario instanceof Alumno) {
                newAuthResponse = new AuthResponse(newAccessToken, (Alumno) usuario);
            } else if (usuario instanceof Profesor) {
                newAuthResponse = new AuthResponse(newAccessToken, (Profesor) usuario);
            } else {
                newAuthResponse = new AuthResponse(newAccessToken, usuario);  // Para Administrador
            }

            return ResponseEntity.ok(newAuthResponse);
        } catch (JWTVerificationException e) {
            System.out.println("Error al validar el token de refresco: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
