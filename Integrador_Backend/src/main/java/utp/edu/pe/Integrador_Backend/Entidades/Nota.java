package utp.edu.pe.Integrador_Backend.Entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Max;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "SOP_NOTA")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_NOTAID")  // Clave primaria
    private Long notaId;

    @Column(name = "N_UNIDAD")
    private Integer unidad;

    @DecimalMin(value = "0.0", inclusive = true, message = "La calificación debe ser mayor o igual a 0")
    @Max(value = 20, message = "La calificación debe ser menor o igual a 20")
    @Column(name = "N_CALIFICACION")
    private Double calificacion;

    @Column(name = "N_CALIFICACION_NUMERO", nullable = false)
    private Integer calificacionNumero; // Identifica la calificación en la unidad (1-4)

    // Relaciones
    @ManyToOne // un alumno puede tener muchas notas en diferentes subcursos.
    @JoinColumn(name = "FK_SOP_ALUMNO_C_USUARIOID")  // FK a SOP_USUARIO_ALUMNO
    @JsonIgnoreProperties({"notas", "asignaciones"})
    private Alumno alumno;

    @ManyToOne //subcurso puede tener muchas notas de diferentes alumnos.
    @JoinColumn(name = "FK_SOP_SUBCURSO_C_SUBCURSOID")  // FK a SOP_CURSO_SUBCURSO
    @JsonIgnoreProperties({"notas", "asignacionesAlumno", "curso"})
    private Subcurso subcurso;
}