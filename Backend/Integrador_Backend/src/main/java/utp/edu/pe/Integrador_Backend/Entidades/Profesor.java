package utp.edu.pe.Integrador_Backend.Entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import java.util.List;
import java.util.Set;

@Entity
@Table(name ="SOP_USUARIO_PROFESOR")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profesor extends Usuario{
    @Column(name = "X_ESPECIALIDAD")
    private String especialidad;

    // Relaciones con otras entidades
    @OneToMany(mappedBy = "profesor")
    @JsonIgnoreProperties("profesor")
    private Set<AsignacionProfesor> asignaciones;
}