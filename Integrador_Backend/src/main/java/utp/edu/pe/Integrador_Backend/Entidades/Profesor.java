package utp.edu.pe.Integrador_Backend.Entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Set;

@Entity
@Table(name ="SOP_USUARIO_PROFESOR")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profesor extends Usuario{

    @Column(name = "X_ESPECIALIDAD", length = 100)
    @Size(max = 100, message = "La especialidad no puede tener más de 100 caracteres")
    private String especialidad;

    @Enumerated(EnumType.STRING)
    @Column(name = "X_NIVEL")
    private Nivel nivel;  // Primaria o Secundaria


    @OneToMany(mappedBy = "profesor",cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<AsignacionProfesor> asignacionProfesor;

}