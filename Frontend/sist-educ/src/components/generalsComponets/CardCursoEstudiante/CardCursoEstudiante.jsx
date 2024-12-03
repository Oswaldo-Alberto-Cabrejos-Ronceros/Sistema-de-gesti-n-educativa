import React from "react";
import "./CardCursoEstudiante.css";

function CardCursoEstudiante({ curso }) {
  return (
    <div className="CardContainer">
      <div className="ImgContainer"></div>
      <div className="ContentContainer">
        <p className="PLg">{curso.Nombre}</p>
        <div className="RowContainer">
          <p className="PMd">Doc: {curso.Docente}</p>
          <p className="PMd Nivel">{curso.Nivel}</p>
        </div>
      </div>
    </div>
  );
}

export default CardCursoEstudiante;
