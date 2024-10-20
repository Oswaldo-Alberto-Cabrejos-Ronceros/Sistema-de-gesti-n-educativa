import React from "react";
import "./VTareasEstudiantePorCurso.css";
import ComBoxTareaXUnidadEstudiante from "../../generalsComponets/ComBoxTareaXUnidadEstudiante/ComBoxTareaXUnidadEstudiante";

function VTareasEstudiantePorCurso({ tareas }) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className="VTareasEstudiantePorCursoContainer">
      <div className="VTareasEstudiantePorCursoTitleContainer">
        <h3>Por curso</h3>
      </div>
      <div className="VTareasEstudiantePorCursoContent">
        {tareas.map((tarea) => {
          unidadString = unidad + numerounidad;
          numerounidad++;
          return (
            <ComBoxTareaXUnidadEstudiante
              unidad={unidadString}
              tareas={tarea}
            />
          );
        })}
      </div>
    </div>
  );
}

export default VTareasEstudiantePorCurso;
