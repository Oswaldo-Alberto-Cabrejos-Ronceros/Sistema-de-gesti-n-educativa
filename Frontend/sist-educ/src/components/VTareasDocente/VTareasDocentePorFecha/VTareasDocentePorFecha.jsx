import React from "react";
import "./VTareasDocentePorFecha.css";
import ComBoxElementTareaDocente from "../../generalsComponets/ComBoxElementTareaDocenteAdmin/ComBoxElementTareaDocenteAdmin";

function VTareasDocentePorFecha({ tareas }) {
  return (
    <div className="VTareasDocentePorFechaContainer">
      <div className="VTareasDocentePorFechaTitleContainer">
        <h3>Por Fecha</h3>
      </div>
      <div className="ComBoxElementTareaDocenteContainerVTareasFecha">
        {tareas.map((tarea, index) => (
          <ComBoxElementTareaDocente key={index} tarea={tarea} />
        ))}
      </div>
    </div>
  );
}

export default VTareasDocentePorFecha;
