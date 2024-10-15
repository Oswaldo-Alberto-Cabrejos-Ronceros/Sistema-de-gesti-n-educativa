import React from "react";
import "./VGestionUsuarios.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VGestionEstudiante from "./VGestionEstudiante/VGestionEstudiante";
import VGestionDocentes from "./VGestionDocentes/VGestionDocentes";

function VGestionUsuarios({ estudiantes, docentes }) {
  let fEstudiantes = function () {
    alert("Presionando Estudiantes");
  };
  let fDocentes = function () {
    alert("Presionando Docentes");
  };
  return (
    <div className="VGestionUsuariosContainer">
      <div className="TitleGestionUsuarios">
        <h3>Gestion de Usuarios:</h3>
      </div>
      <div className="VGestionUsuariosButtonsContainer">
        <PrimaryButton onClick={fEstudiantes} nombre={"Estudiantes"} />
        <PrimaryButton onClick={fDocentes} nombre={"Docentes"} />
      </div>
      <div className="CambGestionUsuarios">
        {/*<VGestionEstudiante estudiantes={estudiantes}/>*/}
        <VGestionDocentes docentes={docentes} />
      </div>
    </div>
  );
}

export default VGestionUsuarios;
