package utp.edu.pe.Integrador_Backend.Entidades;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
@Data
@Entity
public class Horario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private Nivel nivel;

    private int grado;

    private String seccion;

    private String urlArchivo; // Almacena la URL del archivo en S3

    private LocalDateTime fechaCreacion;

    private LocalDateTime fechaActualizacion;

}
