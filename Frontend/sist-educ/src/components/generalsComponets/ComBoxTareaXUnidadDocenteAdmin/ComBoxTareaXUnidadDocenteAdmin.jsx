import React from 'react'
import './ComBoxTareaXUnidadDocenteAdmin.css'
import { useState } from "react";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import ComBoxElementTareaDocenteAdmin from '../ComBoxElementTareaDocenteAdmin/ComBoxElementTareaDocenteAdmin';
import ComBoxElementTareaSubir from '../ComBoxElementTareaSubir/ComBoxElementTareaSubir';

function ComBoxTareaXUnidadDocenteAdmin({to, curso, unidad,tareas}) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);

  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  return (
    <div className='ComBoxTareaXUnidadDocenteAdminContainer'>
          <div className="ComBoxTareaXUnidadSubContainer" onClick={handleClick}>
      <p className="PLg">{unidad}</p>
      <div className="ArrowContainerTarea">
      {mostrarOtroComponente ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </div>
    {mostrarOtroComponente && (
        <div className="ComBoxElementTareaUnitaryContainer">
          {tareas.map((tarea, index) => (
            <ComBoxElementTareaDocenteAdmin key={index} tarea={tarea} to={to} curso={curso}/>
          ))}
          <ComBoxElementTareaSubir/>
        </div>
      )}
    </div>
  )
}

export default ComBoxTareaXUnidadDocenteAdmin