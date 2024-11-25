package utp.edu.pe.Integrador_Backend.Entidades;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name ="SOP_USUARIO_ALUMNO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Alumno  extends Usuario{
    @Column(name = "N_GRADO")  // Número grado
    private Integer grado;

    @Column(name = "C_SECCION",length = 1)
    private String seccion;

    @Enumerated(EnumType.STRING)
    @Column(name = "X_NIVEL")  // Texto para nivel
    private Nivel nivel;

    @Temporal(TemporalType.DATE)
    @Column(name = "F_NACIMIENTO")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate fechaNacimiento;


    // Relaciones con otras entidades
    @OneToMany(mappedBy = "alumno",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties({"asignaciones", "notas","alumno"})
    private Set<AsignacionAlumno> asignaciones = new HashSet<>();;

    @OneToMany(mappedBy = "alumno",cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<Nota> notas;
}
