import React from "react";
import "./CardHorario.css";

function CardHorario({ grado, nivel,url }) {
  let gradNivel = grado + " " + nivel;
  return (
    <div className="CardHorarioContainer">
      <div className="CardHorarioHeaderContainer">
        <h3>{gradNivel}</h3>
      </div>
      <div className="CardHorarioContent">
        {
          url===""?(
            <h3>No hay horario asignado</h3>
          ):(
            <img src={url} alt="Horario" />
          )
        }
        
      </div>
    </div>
  );
}

export default CardHorario;
