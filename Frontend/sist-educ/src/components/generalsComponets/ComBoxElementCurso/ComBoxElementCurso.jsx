import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import "./ComBoxElementCurso.css";
import { Link } from "react-router-dom";

function ComBoxElementCurso({ curso, to, contenido }) {
  return (
    <Link state={{curso,contenido}} to={to} className="LinkComBoxElementCurso">
        <div className="ComBoxElementCursoDocContainer">
      <div className="MdContentPasteSearchContainer">
      <IoDocumentTextOutline />
      </div>
      <p className="PMd">{contenido.nombreContenido}</p>
    </div>
    </Link>

  );
}

export default ComBoxElementCurso;
