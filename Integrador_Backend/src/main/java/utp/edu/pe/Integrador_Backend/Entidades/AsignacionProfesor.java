package utp.edu.pe.Integrador_Backend.Entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "SOP_ASIGNACION_PROFESOR_DETALLE")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AsignacionProfesor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_ASIGNACIONPROFESORID")
    private Long asignacionProfesorId;

    // Relacion con el profesor
    @ManyToOne
    @JoinColumn(name = "FK_SOP_PROFESOR_C_USUARIOID")
    @JsonIgnoreProperties("asignacionesProfesor")
    private Profesor profesor;

    // Relacion con el subcurso
    @ManyToOne
    @JoinColumn(name = "FK_SOP_SUBCURSO_C_SUBCURSOID")
    @JsonIgnoreProperties("asignacionesProfesor")
    private Subcurso subcurso;

    @Column(name = "X_ESTADO")
    private String estado = "ACTIVO";
}
