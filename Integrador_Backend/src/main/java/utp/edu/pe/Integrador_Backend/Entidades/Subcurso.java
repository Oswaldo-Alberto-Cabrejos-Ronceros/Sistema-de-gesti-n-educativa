package utp.edu.pe.Integrador_Backend.Entidades;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "SOP_CURSO_SUBCURSO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Subcurso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_SUBCURSOID")
    private Long subcursoId;

    @Column(name = "X_NOMBRESUBCURSO",length = 30)
    @NotNull
    @NotBlank
    @Size(max = 30, message = "El nombre no puede tener más de 30 caracteres")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "X_NIVEL")
    private Nivel nivel;

    @Column(name = "X_DESCRIPCION",length = 150)
    @Size(max = 150, message = "La descripcion no puede tener más de 150 caracteres")
    private String descripcion;

    // Relaciones
    @ManyToOne
    @JoinColumn(name = "FK_SOP_CURSO_C_CURSOID") // FK a SOP_CURSO
    @JsonIgnoreProperties("subcursos")
    private Curso curso;

    @OneToMany(mappedBy = "subcurso",cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"subcurso"}) //{"subcurso", "profesor"}
    private Set<AsignacionProfesor> asignacionesProfesor;

    @OneToMany(mappedBy = "subcurso", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<AsignacionAlumno> asignacionesAlumno = new HashSet<>();

    @OneToMany(mappedBy = "subcurso", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Nota> notas;

    @OneToMany(mappedBy = "subcurso", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Contenido> contenidos = new HashSet<>();

}
