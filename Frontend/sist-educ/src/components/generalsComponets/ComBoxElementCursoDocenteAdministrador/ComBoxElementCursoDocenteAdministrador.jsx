import React from "react";
import "./ComBoxElementCursoDocenteAdministrador.css";
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoPencil } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";

function ComBoxElementCursoDocenteAdministrador({ contenido }) {
  return (
    <div className="ComBoxElementCursoDoceAdminContainer">
      <div className="IconContenidoContainer">
        <IoDocumentTextOutline />
      </div>
      <p className="PMd">{contenido.nombre}</p>
      <a href={contenido.link}>contenido</a>
      <div className="IconsEdElContainer">
        <div className="IconEditarContainer">
          <GoPencil />
        </div>
        <div className="IconEliminarContainer">
          <MdOutlineDeleteOutline />
        </div>
      </div>
    </div>
  );
}

export default ComBoxElementCursoDocenteAdministrador;
