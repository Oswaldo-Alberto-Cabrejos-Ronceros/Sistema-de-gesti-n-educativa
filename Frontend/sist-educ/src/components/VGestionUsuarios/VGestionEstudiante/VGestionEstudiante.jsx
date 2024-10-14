import React from "react";
import "./VGestionEstudiante.css";
import TablaGestionEstudiantes from "./TablaGestionEstudiantes/TablaGestionEstudiantes";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import FormularioAgregarEstudiante from "./FormularioAgregarEstudiante/FormularioAgregarEstudiante";

function VGestionEstudiante({estudiantes}) {

  let fAgregar=function(){
      alert("Presionando Agregar");
  }

  return (
    <div className="VGestionEstudianteContainer">
      <div className="TitleGestionEstudiante">
        <h3>Gestion de Estudiantes:</h3></div>
        <div className="VGestionEstudiantesContent">
          <div>
        <TablaGestionEstudiantes estudiantes={estudiantes}/>
        </div>
        <div className="ButtonAgregar">
        <PrimaryButton onClick={fAgregar} nombre={"Agregar Estudiante"}/>
        </div>
        <FormularioAgregarEstudiante/>
        </div>
        
      </div>
  );
}

export default VGestionEstudiante;
