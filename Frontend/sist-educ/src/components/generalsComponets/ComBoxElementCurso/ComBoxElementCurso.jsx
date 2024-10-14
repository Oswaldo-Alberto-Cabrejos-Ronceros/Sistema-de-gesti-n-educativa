import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import "./ComBoxElementCurso.css";

function ComBoxElementCurso({ contenido }) {
  return (
    <div className="ComBoxElementCursoDocContainer">
      <div className="MdContentPasteSearchContainer">
      <IoDocumentTextOutline />
      </div>
      <p className="PMd">{contenido.nombre}</p>
      <a href={contenido.link}>contenido</a>
    </div>
  );
}

export default ComBoxElementCurso;
