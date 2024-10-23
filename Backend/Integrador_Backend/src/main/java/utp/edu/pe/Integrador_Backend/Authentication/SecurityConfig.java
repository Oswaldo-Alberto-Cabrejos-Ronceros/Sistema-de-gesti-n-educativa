package utp.edu.pe.Integrador_Backend.Authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import utp.edu.pe.Integrador_Backend.Service.AuthenticationService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        return httpSecurity
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(http -> {
                    // Endpoints públicos
                    http.requestMatchers("/auth/login").permitAll();

                    // Endpoints protegidos (solo ADMIN)
                    http.requestMatchers(HttpMethod.POST, "/api/administradores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/administradores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/administradores/**").hasAuthority("ADMIN");

                    // Endpoints relacionados a alumnos (ADMIN)
                    http.requestMatchers(HttpMethod.POST, "/api/alumnos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/alumnos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/alumnos/**").hasAuthority("ADMIN");

                    // Acceso a GET de alumnos para ADMIN y PROFESORES
                    http.requestMatchers(HttpMethod.GET, "/api/alumnos/**").hasAnyAuthority("ADMIN", "PROFESOR");

                    // Endpoints relacionados a profesores (ADMIN)
                    http.requestMatchers(HttpMethod.GET, "/api/profesores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.POST, "/api/profesores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/profesores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/profesores/**").hasAuthority("ADMIN");

                    // Endpoints relacionados a cursos (ADMIN)
                    http.requestMatchers(HttpMethod.GET, "/api/cursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.POST, "/api/cursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/cursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/cursos/**").hasAuthority("ADMIN");

                    // Endpoints relacionados a subcursos (ADMIN)
                    http.requestMatchers(HttpMethod.GET, "/api/subcursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.POST, "/api/subcursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/subcursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/subcursos/**").hasAuthority("ADMIN");

                    // Endpoints de notas (PROFESOR)
                    http.requestMatchers(HttpMethod.POST, "/api/notas/**").hasAuthority("PROFESOR");
                    http.requestMatchers(HttpMethod.PUT, "/api/notas/**").hasAuthority("PROFESOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/notas/**").hasAuthority("PROFESOR");

                    //Endpoints para estudaintes
                    http.requestMatchers(HttpMethod.GET, "/api/alumnos/{alumnoId}/notas").hasAuthority("STUDENT");
                    http.requestMatchers(HttpMethod.GET, "/api/alumnos/{alumnoId}/subcurso/{subcursoId}/notas").hasAuthority("STUDENT");

                    // Permitir acceso solo a usuarios autenticados para cualquier otra ruta
                    http.anyRequest().authenticated();
                })
                .addFilterBefore(new JwtAuthFilter(jwtUtil), BasicAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(AuthenticationService authenticationService) {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(passwordEncoder());
        provider.setUserDetailsService(authenticationService::loadUserByUsername);
        return provider;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
