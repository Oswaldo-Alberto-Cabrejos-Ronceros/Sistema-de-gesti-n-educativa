import React from "react";
import "./VTareasEstudiantePorFecha.css";
import ComBoxElementTarea from "../../generalsComponets/ComBoxElementTarea/ComBoxElementTarea";

function VTareasEstudiantePorFecha({ tareas }) {
  return (
    <div className="VTareasEstudiantePorFechaContainer">
      <div className="VTareasEstudiantePorFechaTitleContainer">
        <h3>Por Fecha</h3>
      </div>
      <div className="ComBoxElementContainerVTareasFecha">
        {tareas.map((tarea, index) => (
          <ComBoxElementTarea key={index} tarea={tarea} />
        ))}
      </div>
    </div>
  );
}

export default VTareasEstudiantePorFecha;
