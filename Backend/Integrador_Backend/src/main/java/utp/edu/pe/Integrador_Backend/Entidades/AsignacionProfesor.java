package utp.edu.pe.Integrador_Backend.Entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    @Column(name = "N_GRADO")
    private Integer grado;

    // Relaciones
    @ManyToOne
    @JoinColumn(name = "FK_SOP_PROFESOR_C_USUARIOID") //FK a SOP_USUARIO_PROFESOR
    private Profesor profesor;

    @ManyToOne
    @JoinColumn(name = "FK_SOP_SUBCURSO_C_SUBCURSOID") // FK a SOP_CURSO_SUBCURSO
    private Subcurso subcurso;
}
