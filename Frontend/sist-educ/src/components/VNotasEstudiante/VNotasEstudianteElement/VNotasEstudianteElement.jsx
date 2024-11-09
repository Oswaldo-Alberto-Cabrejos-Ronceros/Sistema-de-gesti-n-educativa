import React from "react";
import "./VNotasEstudianteElement.css";
import TablaNotasEstudiante from "../../generalsComponets/TablaNotasEstudiante/TablaNotasEstudiante";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import TablaNotasEstudianteCurso from "../../generalsComponets/TablaNotasEstudianteCurso/TablaNotasEstudianteCurso";

function VNotasEstudianteElement() {
  const location = useLocation();
  const { title } = location.state || {};
  const {indicador} =location.state || {};
  console.log(indicador)
  const { tipo } = useParams();
  console.log(title);
  console.log(tipo);
  console.log(indicador);

  return (
    <div className="VNotasEstudianteElementContainer">
      <div className="TitleVNotasEstudianteElementContainer">
        <h3>{title}</h3>
      </div>
      <div className="VNotasEstudianteElementContent">
          <TablaNotasEstudiante tipo={tipo} indicador={indicador} />
      </div>
    </div>
  );
}

export default VNotasEstudianteElement;
