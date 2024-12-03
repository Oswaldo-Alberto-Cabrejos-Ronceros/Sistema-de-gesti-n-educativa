package utp.edu.pe.Integrador_Backend.Authentication;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import utp.edu.pe.Integrador_Backend.Service.AuthenticationService;

import java.util.List;


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
                .cors(Customizer.withDefaults()) // Habilitar CORS en Spring Security
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(http -> {
                    // Endpoints públicos
                    http.requestMatchers("/auth/login").permitAll();
                    http.requestMatchers("/auth/refresh").permitAll();
                    http.requestMatchers("/api/alumnos/**").permitAll();
                    http.requestMatchers("/reportes/notas/**").permitAll();



                    // Endpoints protegidos (solo ADMIN)
                    http.requestMatchers(HttpMethod.POST, "/api/administradores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/administradores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/administradores/**").hasAuthority("ADMIN");



                    // Endpoints relacionados a profesores (ADMIN)
                    http.requestMatchers(HttpMethod.GET, "/api/profesores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.POST, "/api/profesores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/profesores/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/profesores/**").hasAuthority("ADMIN");

                    // Endpoints relacionados a Horarios (ADMIN)
                    http.requestMatchers(HttpMethod.GET, "/api/horarios/**").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/horarios/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/horarios/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/horarios/**").hasAuthority("ADMIN");


                    // Endpoints relacionados a Contenidos (ADMIN) /api/contenidos
                    http.requestMatchers(HttpMethod.GET, "/api/contenidos/**").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/contenidos/**").hasAnyAuthority("PROFESOR", "ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/contenidos/**").hasAnyAuthority("PROFESOR", "ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/contenidos/**").hasAnyAuthority("PROFESOR", "ADMIN");

                    // Endpoints relacionados a cursos (ADMIN)
                    http.requestMatchers(HttpMethod.GET, "/api/cursos/**").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/cursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/cursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/cursos/**").hasAuthority("ADMIN");

                    // Endpoints relacionados a subcursos (ADMIN)
                    http.requestMatchers(HttpMethod.GET, "/api/subcursos/**").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/subcursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/subcursos/**").hasAuthority("ADMIN");
                    http.requestMatchers(HttpMethod.DELETE, "/api/subcursos/**").hasAuthority("ADMIN");

                    // Endpoints de notas (PROFESOR)
                    http.requestMatchers(HttpMethod.GET, "/api/notas/**").permitAll();
                    http.requestMatchers(HttpMethod.POST, "/api/notas/**").hasAnyAuthority("PROFESOR", "ADMIN");
                    http.requestMatchers(HttpMethod.PUT, "/api/notas/**").hasAuthority("PROFESOR");
                    http.requestMatchers(HttpMethod.DELETE, "/api/notas/**").hasAuthority("PROFESOR");

                    //Endpoints para estudaintes
                    http.requestMatchers(HttpMethod.GET, "/api/alumnos/{alumnoId}/notas").hasAuthority("STUDENT");
                    http.requestMatchers(HttpMethod.GET, "/api/alumnos/{alumnoId}/subcurso/{subcursoId}/notas").hasAuthority("STUDENT");

                    // Permitir acceso solo a usuarios autenticados para cualquier otra ruta
                    http.anyRequest().authenticated();
                })
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setContentType("application/json");
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.getWriter().write("{\"error\": \"Usuario no autenticado\"}");
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setContentType("application/json");
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.getWriter().write("{\"error\": \"Acceso denegado\"}");
                        })
                )
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

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://aplication-educ-host-react.s3-website-sa-east-1.amazonaws.com","http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
