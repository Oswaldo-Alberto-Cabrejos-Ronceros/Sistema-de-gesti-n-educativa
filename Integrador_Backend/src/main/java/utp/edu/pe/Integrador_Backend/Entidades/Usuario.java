package utp.edu.pe.Integrador_Backend.Entidades;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SOP_USUARIO")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_USUARIOID")  // Código de usuario
    private Long usuarioId;

    @Column(name = "X_NOMBRE",length = 30)
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 30, message = "El nombre no puede tener más de 30 caracteres")
    private String nombre;

    @Column(name = "X_APELLIDO",length =60 )
    @Size(max = 60, message = "El apellido no puede tener más de 60 caracteres")
    @NotBlank(message = "El apellido no puede estar vacío")
    private String apellido;

    @Column(name = "C_DNI", unique = true, length = 8)  // Código de DNI
    @NotBlank(message = "El DNI no puede estar vacío")
    @Size(min = 8, max = 8, message = "El DNI debe tener exactamente 8 caracteres")
    private String dni;

    @Column(name = "C_TELEFONO")  // Código de teléfono
    @Size(max = 9, message = "El teléfono debe tener máximo 9 dígitos")
    private String telefono;

    @Column(name = "C_CODIGO", unique = true)  // Código de usuario
    private String codigo;

    @Column(name = "X_PASSWORD")  // Texto para contraseña
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(name = "X_ROL")
    private Rol rol;
}
