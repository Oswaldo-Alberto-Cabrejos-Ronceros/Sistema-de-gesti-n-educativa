import React from "react";
import { useState } from "react";
import "./ComBoxCursoXUnidadDocente.css";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import ComBoxElementCursoDocente from "../ComBoxElementCursoDocenteAdministrador/ComBoxElementCursoDocenteAdministrador";
import ComBoxElementCursoSubir from "../ComBoxElementCursoSubir/ComBoxElementCursoSubir";

function ComBoxCursoXUnidadDocente({to, curso, unidad,contenidos}) {
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
          {contenidos.map((contenido, index) => (
            <ComBoxElementCursoDocente key={index} contenido={contenido} to={to} curso={curso} />
          ))}
          <ComBoxElementCursoSubir />
        </div>
      )}
    </div>
  );
}

export default ComBoxCursoXUnidadDocente;
