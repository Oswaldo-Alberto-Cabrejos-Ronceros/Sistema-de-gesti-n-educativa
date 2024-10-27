import React from "react";
import { useState } from "react";
import "./ComBoxCursoXUnidadEstudiante.css";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import ComBoxElementCurso from "../ComBoxElementCurso/ComBoxElementCurso";
import { Link } from "react-router-dom";

function ComBoxCursoXUnidadEstudiante({to,curso,unidad,contenidos}) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);

  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  
  return (
    <div className="ComBoxGeneralContainer">
    <div className="ComBoxCursoXUnidadContainer" onClick={handleClick}>
      <p className="PLg">{unidad}</p>
      <div className="ArrowContainer">
      {mostrarOtroComponente ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
    </div>
    {mostrarOtroComponente && (
        <div className="ComBoxElementContainer">
          {contenidos.map((contenido) => (
            <ComBoxElementCurso contenido={contenido} to={to} curso={curso}/>
          ))}
        </div>
      )}
    </div>
  );
}

export default ComBoxCursoXUnidadEstudiante;
