package utp.edu.pe.Integrador_Backend.Entidades;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
@Table(name = "horarios_profesores")
public class HorarioProfesor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "profesor_id", unique = true)
    private Profesor profesor;

    @Column(name = "url_archivo", nullable = false)
    private String urlArchivo; // URL del horario almacenado en S3

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;
}
