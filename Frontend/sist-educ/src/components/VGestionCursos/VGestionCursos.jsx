import React from "react";
import "./VGestionCursos.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VGestionCursosCursos from "./VGestionCursosCursos/VGestionCursosCursos";
import VGestionCursosSubCursos from "./VGestionCursosSubCursos/VGestionCursosSubCursos";

function VGestionCursos({ cursos, subcursos }) {
  let fCursos = function () {
    alert("Presionando Cursos");
  };
  let fSubcursos = function () {
    alert("Presionando Subcursos");
  };
  return (
    <div className="VGestionCursosContainer">
      <div className="TitleGestionCursos">
        <h3>Gestion de Cursos:</h3>
      </div>
      <div className="VGestionCursosButtonsContainer">
        <PrimaryButton onClick={fCursos} nombre={"Cursos"} />
        <PrimaryButton onClick={fSubcursos} nombre={"Subcursos"} />
      </div>
      <div className="CambGestionCursos">
        {/*<VGestionCursosCursos cursos={cursos}/>*/}
        <VGestionCursosSubCursos subcursos={subcursos} />
      </div>
    </div>
  );
}

export default VGestionCursos;
