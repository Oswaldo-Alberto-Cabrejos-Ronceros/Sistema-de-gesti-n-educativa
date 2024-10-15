import React from 'react'
import './ComBoxTareaXUnidadEstudiante.css'
import { useState } from "react";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import ComBoxElementTarea from "../../generalsComponets/ComBoxElementTarea/ComBoxElementTarea"

function ComBoxTareaXUnidadEstudiante({unidad,tareas}) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);

  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  return (
    <div className='ComBoxTareaXUnidadContainer'>
    <div className="ComBoxCursoXUnidadContainer" onClick={handleClick}>
      <p className="PLg">{unidad}</p>
      <div className="ArrowContainer">
      {mostrarOtroComponente ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </div>
    {mostrarOtroComponente && (
        <div className="ComBoxElementTareaContainer">
          {tareas.map((tarea, index) => (
            <ComBoxElementTarea key={index} tarea={tarea} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ComBoxTareaXUnidadEstudiante