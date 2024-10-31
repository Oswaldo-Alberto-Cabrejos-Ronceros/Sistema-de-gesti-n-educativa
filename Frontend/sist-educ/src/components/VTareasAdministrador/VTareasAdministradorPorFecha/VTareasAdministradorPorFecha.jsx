import React from "react";
import "./VTareasAdministradorPorFecha.css";
import ComBoxElementTareaAdmin from "../../generalsComponets/ComBoxElementTareaDocenteAdmin/ComBoxElementTareaDocenteAdmin";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";

function VTareasAdministradorPorFecha({to, tareasPorFecha, tareas }) {
  let optionsNivel = ["Primaria", "Secundaria"];
  let optionsGrado = [
    "1er Grado",
    "2do Grado",
    "3er Grado",
    "4to Grado",
    "5to Grado",
    "6to Grado",
  ];
  let optionsSeccion = ["Unica", "A", "B"];
  return (
    <div className="VTareasAdministradorPorFechaContainer">
      <div className="VTareasAdministradorPorFechaTitleContainer">
        <h3>Por Fecha</h3>
      </div>
      <div className="SelectTareasAdministradorPorFechaGeneralContainer">
        <div className="SelectTareasAdministradorPorFechaContainer">
          <SelectComponent name={"Nivel"} options={optionsNivel} />
          <SelectComponent name={"Grado"} options={optionsGrado} />
          <SelectComponent name={"Seccion"} options={optionsSeccion} />
        </div>
      </div>
      <div className="ComBoxElementTareaDocenteContainerVTareasAdministradorPorFecha">
        {tareas.map((tarea, index) => (
          <ComBoxElementTareaAdmin key={index} tarea={tarea} to={to} curso={tareasPorFecha} />
        ))}
      </div>
    </div>
  );
}

export default VTareasAdministradorPorFecha;
