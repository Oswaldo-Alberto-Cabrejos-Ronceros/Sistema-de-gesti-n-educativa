import React from "react";
import "./CardContenidoCurso.css";
import PrimaryButtonLarge from "../PrimaryButtonLarge/PrimaryButtonLarge";

function CardContenidoCurso({ contenido }) {
  return (
    <div className="CardContenidoCursoContainer">
      <div className="CardContenidoCursoTitleContainer">
        <h3>{contenido.nombre}</h3>
      </div>
      <div className="CardContenidoCursoDescriptionContainer">
        <p className="PMd">{contenido.descripcion}</p>
      </div>
      <div className="CardContenidoCursoButtonContainer">
        <PrimaryButtonLarge nombre={"Descargar Archivo"} />
      </div>
    </div>
  );
}

export default CardContenidoCurso;
