package utp.edu.pe.Integrador_Backend.Entidades;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
@Entity
@Data
public class Contenido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Nivel nivel;

    @Min(value = 1, message = "El grado debe ser mayor que 0")
    @Max(value = 9, message = "El grado debe ser menor que 9")
    private int grado;

    @ManyToOne
    @JoinColumn(name = "subcurso_id")
    private Subcurso subcurso;

    @Min(value = 1, message = "La Unidad debe ser mayor que 0")
    @Max(value = 9, message = "La Unidad debe ser menor que 9")
    private int unidad;

    @Column(name = "nombre",length = 100)
    @NotNull(message = "El nombre no puede ser nulo")
    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 100, message = "La descripcion no puede tener más de 100 caracteres")
    private String nombreContenido;

    @NotNull(message = "La descripcion no puede ser nulo")
    @NotBlank(message = "El nombre no puede estar vacío")
    private String descripcion;

    @Column(name = "url_archivo", nullable = false)// FK a SOP_CURSO_SUBCURSO
    private String urlArchivo;

    @Column(name = "tarea", length = 5)
    private Boolean isTarea; // true o false
}
