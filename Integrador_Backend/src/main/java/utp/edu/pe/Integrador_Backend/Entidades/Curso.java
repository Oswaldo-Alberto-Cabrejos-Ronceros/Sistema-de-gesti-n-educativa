package utp.edu.pe.Integrador_Backend.Entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "SOP_CURSO")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Curso {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "C_CURSOID")
    private Long cursoId;

    @NotNull
    @NotBlank
    @Column(name = "X_NOMBRECURSO",length = 30)
    @Size(max = 30, message = "El nombre no puede tener más de 3 caracteres")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "X_NIVEL")
    private Nivel nivel;

    @Column(name = "X_DESCRIPCION",length = 150)
    @Size(max = 100, message = "La descripcion no peude tener más de 150 caracteres")
    private String descripcion;

    // Relaciones
    @OneToMany(mappedBy = "curso",cascade = CascadeType.ALL)
    @JsonIgnoreProperties("curso")
    private Set<Subcurso> subcursos;
}
