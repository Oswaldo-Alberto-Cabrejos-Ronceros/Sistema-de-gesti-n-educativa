import React from "react";
import "./CardContenidoCurso.css";
import PrimaryButtonLarge from "../PrimaryButtonLarge/PrimaryButtonLarge";

function CardContenidoCurso({ contenido }) {
  const handleAbrirEnlace = () => {
    window.open(contenido.urlArchivo, "_blank"); 
  };
  return (
    <div className="CardContenidoCursoContainer">
      <div className="CardContenidoCursoTitleContainer">
        <h3>{contenido.nombreContenido}</h3>
      </div>
      <div className="CardContenidoCursoDescriptionContainer">
        <p className="PMd">{contenido.descripcion}</p>
      </div>
      <div className="CardContenidoCursoButtonContainer">
        <PrimaryButtonLarge nombre={"Descargar Archivo"} onClick={handleAbrirEnlace}/>
      </div>
    </div>
  );
}

export default CardContenidoCurso;
