import React from "react";
import "./VGestionUsuarios.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VGestionEstudiante from "./VGestionEstudiante/VGestionEstudiante";
import VGestionDocentes from "./VGestionDocentes/VGestionDocentes";
import { Routes, Route, Link } from 'react-router-dom';

function VGestionUsuarios({ estudiantes, docentes }) {

  return (
    <div className="VGestionUsuariosContainer">
      <div className="TitleGestionUsuarios">
        <h3>Gestion de Usuarios:</h3>
      </div>
      <div className="VGestionUsuariosButtonsContainer">
        <Link className="LinkVGestionUsuarios" to={"estudiantes"}>
        <PrimaryButton nombre={"Estudiantes"} />
        </Link>
        <Link className="LinkVGestionUsuarios" to={"docentes"}>
        <PrimaryButton  nombre={"Docentes"} />
        </Link>
      </div>
      <div className="CambGestionUsuarios">
        <Routes>
          <Route index element={<VGestionEstudiante estudiantes={estudiantes}/>}/>
          <Route path="estudiantes" element={<VGestionEstudiante estudiantes={estudiantes}/>}/>
          <Route path="docentes" element={<VGestionDocentes docentes={docentes}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default VGestionUsuarios;
