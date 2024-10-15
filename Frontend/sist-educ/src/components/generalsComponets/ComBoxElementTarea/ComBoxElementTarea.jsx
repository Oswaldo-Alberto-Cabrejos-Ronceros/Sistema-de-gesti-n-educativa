import React from "react";
import "./ComBoxElementTarea.css";
import { SlPencil } from "react-icons/sl";

function ComBoxElementTarea({tarea}) {
  return (
    <div className="ComBoxElementTareaContainer">
      <div className="IconContainer">
        <SlPencil/>
      </div>
      <p className="PMd">{tarea.nombre}</p>
      <a href={tarea.link}>contenido</a>
      <p className="PMd">{tarea.fechaEntrega}</p>
    </div>
  );
}

export default ComBoxElementTarea;
