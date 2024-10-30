import React from "react";
import "./ComBoxTareaXUnidadEstudiante.css";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ComBoxElementTarea from "../../generalsComponets/ComBoxElementTarea/ComBoxElementTarea";

function ComBoxTareaXUnidadEstudiante({ to, curso, unidad, tareas }) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);

  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  return (
    <div className="ComBoxGeneralTareaXUnidadContainer">
      <div className="ComBoxTareaXUnidadContainer" onClick={handleClick}>
        <p className="PLg">{unidad}</p>
        <div className="ArrowContainer">
          {mostrarOtroComponente ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {
      mostrarOtroComponente && (
        <div className="ComBoxGeneralElementTareaContainer">
          {tareas.map((tarea, index) => (
            <ComBoxElementTarea key={index} tarea={tarea} to={to} curso={curso}  />
          ))
          }
        </div>
      )}
    </div>
  );
}

export default ComBoxTareaXUnidadEstudiante;
