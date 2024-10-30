import React from "react";
import "./VCursoEstudianteContenidoTareas.css";
import ComBoxTareaXUnidadEstudiante from "../../../generalsComponets/ComBoxTareaXUnidadEstudiante/ComBoxTareaXUnidadEstudiante";

function VCursoEstudianteContenidoTareas({to, curso, tareas }) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className="VCursoEstudianteContenidoTareasContainer">
      {tareas.map((tarea) => {
        unidadString = unidad + numerounidad;
        numerounidad++;
        return (
          <ComBoxTareaXUnidadEstudiante
            unidad={unidadString}
            tareas={tarea}
            curso={curso}
            to={to}
          />
        );
      })}
    </div>
  );
}

export default VCursoEstudianteContenidoTareas;
