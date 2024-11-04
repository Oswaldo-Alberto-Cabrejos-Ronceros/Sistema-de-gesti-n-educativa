package utp.edu.pe.Integrador_Backend.Authentication;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsUtil {
    public static void imprimirDetallesUsuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();

            if (principal instanceof UserDetails) {
                UserDetails userDetails = (UserDetails) principal;
                String username = userDetails.getUsername();
                String roles = userDetails.getAuthorities().toString();

                // Aquí puedes imprimir el usuario autenticado, roles, etc.
                System.out.println("Usuario autenticado: " + username);
                System.out.println("Roles del usuario: " + roles);
            } else {
                System.out.println("Principal: " + principal.toString());
            }
        }
    }
}
