package utp.edu.pe.Integrador_Backend.Service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utp.edu.pe.Integrador_Backend.Entidades.ActualizarAdministradorRequest;
import utp.edu.pe.Integrador_Backend.Entidades.Administrador;
import utp.edu.pe.Integrador_Backend.Entidades.Rol;
import utp.edu.pe.Integrador_Backend.Repository.AdministradorRepository;

import java.util.List;
@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Metodo para listar administradores
    public List<Administrador> listarAdministradores() {
        return administradorRepository.findAll();
    }

    @Transactional
    public Administrador crearAdministrador(Administrador administrador) {
        if (administradorRepository.findByDni(administrador.getDni()).isPresent()) {
            throw new RuntimeException("Ya existe un administrador con este DNI");
        }

        if (administradorRepository.findByCodigo(administrador.getCodigo()).isPresent()) {
            throw new RuntimeException("Ya existe un administrador con este correo");
        }

        // Hashear la contraseña con BCrypt
        String hashedPassword = passwordEncoder.encode(administrador.getPassword());
        administrador.setPassword(hashedPassword);

        administrador.setRol(Rol.ADMIN);

        return administradorRepository.save(administrador);
    }

    @Transactional
    public Administrador actualizarAdministrador(Long id, ActualizarAdministradorRequest request) {
        Administrador administrador = administradorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado con id: " + id));

        // Verificar si el DNI ya está registrado por otro administrador
        if (request.getDni() != null && !request.getDni().isEmpty() &&
                administradorRepository.findByDni(request.getDni()).isPresent() &&
                !administrador.getDni().equals(request.getDni())) {
            throw new RuntimeException("Ya existe un administrador con este DNI");
        }

        // Verificar si el correo ya está registrado por otro administrador
        if (request.getCorreo() != null && !request.getCorreo().isEmpty() &&
                administradorRepository.findByCodigo(request.getCorreo()).isPresent() &&
                !administrador.getCodigo().equals(request.getCorreo())) {
            throw new RuntimeException("Ya existe un administrador con este correo");
        }

        // Actualizar los campos si se proporcionan
        if (request.getNombre() != null && !request.getNombre().isEmpty()) {
            administrador.setNombre(request.getNombre());
        }

        if (request.getApellido() != null && !request.getApellido().isEmpty()) {
            administrador.setApellido(request.getApellido());
        }

        if (request.getDni() != null && !request.getDni().isEmpty()) {
            administrador.setDni(request.getDni());
        }

        if (request.getTelefono() != null && !request.getTelefono().isEmpty()) {
            administrador.setTelefono(request.getTelefono());
        }

        if (request.getCorreo() != null && !request.getCorreo().isEmpty()) {
            administrador.setCodigo(request.getCorreo()); // El correo también es el código
        }

        if (request.getPassword() != null && !request.getPassword().isEmpty()) {
            // Hashear la nueva contraseña
            String hashedPassword = passwordEncoder.encode(request.getPassword());
            administrador.setPassword(hashedPassword);
        }

        // Guardar el administrador actualizado en la base de datos
        return administradorRepository.save(administrador);
    }


    @Transactional
    public void eliminarAdministrador(Long id) {
        Administrador administrador = administradorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Administrador no encontrado con id: " + id));


        administradorRepository.delete(administrador);
    }

}
