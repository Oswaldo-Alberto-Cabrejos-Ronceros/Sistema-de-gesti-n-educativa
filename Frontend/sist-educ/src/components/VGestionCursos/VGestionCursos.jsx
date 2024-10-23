import React from "react";
import "./VGestionCursos.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import { Routes, Route, Link } from 'react-router-dom';
import VGestionCursosCursos from "./VGestionCursosCursos/VGestionCursosCursos";
import VGestionCursosSubCursos from "./VGestionCursosSubCursos/VGestionCursosSubCursos";

function VGestionCursos({ cursos, subcursos }) {
  return (
    <div className="VGestionCursosContainer">
      <div className="TitleGestionCursos">
        <h3>Gestion de Cursos:</h3>
      </div>
      <div className="VGestionCursosButtonsContainer">
        <Link className="VGestionCursosContainer" to={"cursos"}> 
        <PrimaryButton nombre={"Cursos"} />
        </Link>
        <Link className="VGestionCursosContainer" to={"subcursos"}>
        <PrimaryButton nombre={"Subcursos"} />
        </Link>
      </div>
      <div className="CambGestionCursos">
        <Routes>
          <Route index element={<VGestionCursosCursos cursos={cursos}/>}/>
          <Route path="cursos" element={<VGestionCursosCursos cursos={cursos}/>}/>
          <Route path="subcursos" element={<VGestionCursosSubCursos subcursos={subcursos}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default VGestionCursos;
