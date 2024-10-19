import React from "react";
import "./CardHorario.css";

function CardHorario({ grado, nivel }) {
  let gradNivel = grado + " " + nivel;
  return (
    <div className="CardHorarioContainer">
      <div className="CardHorarioHeaderContainer">
        <h3>{gradNivel}</h3>
      </div>
      <div className="CardHorarioContent">
        
      </div>
    </div>
  );
}

export default CardHorario;
