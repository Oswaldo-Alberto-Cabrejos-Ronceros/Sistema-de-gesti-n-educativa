import React from "react";
import "./ComBoxElementCursoDocenteAdministrador.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

function ComBoxElementCursoDocenteAdministrador({ curso, to, contenido }) {
  return (
    <Link state={{curso, contenido}} to={to}>
    <div className="ComBoxElementCursoDoceAdminContainer">
      <div className="IconContenidoContainer">
        <IoDocumentTextOutline />
      </div>
      <p className="PMd">{contenido.nombre}</p>
      <div className="IconsEdElContainer">
        <div className="IconEditarContainer">
          <GoPencil />
        </div>
        <div className="IconEliminarContainer">
          <MdOutlineDeleteOutline />
        </div>
      </div>
    </div>
    </Link>
  );
}

export default ComBoxElementCursoDocenteAdministrador;
