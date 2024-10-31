import React from "react";
import "./ComBoxElementTarea.css";
import { SlPencil } from "react-icons/sl";
import { Link } from "react-router-dom";

function ComBoxElementTarea({curso, to, tarea}) {
  //curso se pasa como estado, esta variable tambien se usa para guardar otros estados dependiendo del contexto
  return (
    <Link state={{curso,tarea}} to={to}>
    <div className="ComBoxElementTareaContainer">
      <div className="IconContainer">
        <SlPencil/>
      </div>
      <p className="PMd">{tarea.nombre}</p>
      <p className="PMd">{tarea.fechaEntrega}</p>
    </div>
    </Link>
  );
}

export default ComBoxElementTarea;
