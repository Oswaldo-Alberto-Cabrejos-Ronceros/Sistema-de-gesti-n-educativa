import React from "react";
import { useState } from "react";
import "./ComBoxCursoXUnidadDocente.css";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import ComBoxElementCurso from "../ComBoxElementCurso/ComBoxElementCurso";
import ComBoxElementCursoSubir from "../ComBoxElementCursoSubir/ComBoxElementCursoSubir";

function ComBoxCursoXUnidadDocente({unidad,contenidos}) {
  const [mostrarOtroComponente, setMostrarOtroComponente] = useState(false);

  const handleClick = () => {
    setMostrarOtroComponente(!mostrarOtroComponente);
  };
  const contenido={
    nombre:"Angulos Trigonometricos",
    link:"https://www.youtube.com/",
  }

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
          {contenidos.map((contenido, index) => (
            <ComBoxElementCurso contenido={contenido} />
          ))}
          <ComBoxElementCursoSubir />
        </div>
      )}
    </div>
  );
}

export default ComBoxCursoXUnidadDocente;
