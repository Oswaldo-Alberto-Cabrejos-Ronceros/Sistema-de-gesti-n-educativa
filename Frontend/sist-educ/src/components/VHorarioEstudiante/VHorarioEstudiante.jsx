import React from "react";
import './VHorarioEstudiante.css'
import CardHorario from "../generalsComponets/CardHorario/CardHorario";

function VHorarioEstudiante({grado, nivel}) {
  return (
    <div className="VHorarioEstudianteContainer">
      <div className="VHorarioEstudianteTitle">
        <h3>Horario</h3>
      </div>
      <div className="HorarioContainer">
      <CardHorario grado={grado} nivel={nivel}/>
      </div>
    </div>
  );
}

export default VHorarioEstudiante;
