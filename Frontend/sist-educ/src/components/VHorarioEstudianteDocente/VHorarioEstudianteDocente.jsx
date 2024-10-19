import React from "react";
import './VHorarioEstudianteDocente.css'
import CardHorario from "../generalsComponets/CardHorario/CardHorario";

function VHorarioEstudianteDocente({grado_Apellidos, nivel_Nombres}) {
  return (
    <div className="VHorarioEstudianteDocenteContainer">
      <div className="VHorarioEstudianteDocenteTitle">
        <h3>Horario</h3>
      </div>
      <div className="HorarioContainer">
      <CardHorario grado={grado_Apellidos} nivel={nivel_Nombres}/>
      </div>
    </div>
  );
}

export default VHorarioEstudianteDocente;
