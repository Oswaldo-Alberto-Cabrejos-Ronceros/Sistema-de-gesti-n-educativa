import React from "react";
import './VNotasEstudianteCurso.css'
import ComponentNotasEstudianteElement from "../../generalsComponets/ComponentNotasEstudianteElement/ComponentNotasEstudianteElement";

function VNotasEstudianteCurso() {
  const cursos = [
    "Matematicas",
    "Personal Social",
    "Comunicacion",
    "Razonamiento Matematico",
    "Arte",
    "Religion",
  ];
  return (
    <div className="VNotasEstudianteCursoContainer">
    {
      cursos.map((curso)=>(
        <ComponentNotasEstudianteElement title={curso} tipo={"curso"}/>
      ))
    }
    </div>
  );
}

export default VNotasEstudianteCurso;
