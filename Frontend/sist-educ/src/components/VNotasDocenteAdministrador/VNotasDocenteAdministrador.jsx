import React from "react";
import "./VNotasDocenteAdministrador.css";
import { Routes, Route } from "react-router-dom";
import VNotasDocenteAdministradorCursos from "./VNotasDocenteAdministradorCursos/VNotasDocenteAdministradorCursos";
import VSubirNotasDocente from "../VNotasDocenteAdministrador/VSubirNotasDocenteAdministrador/VSubirNotasDocenteAdministrador";
import VVerNotasDocente from "./VVerNotasDocenteAdministrador/VVerNotasDocenteAdministrador";

function VNotasDocenteAdministrador() {
  let curso = {
    nombre: "Matematica",
    grado: "6to",
    seccion: "Unica",
    nivel: "Primaria",
  };
  return (
    <div className="VNotasDocenteAdministradorContainer">
      <div className="VNotasDocenteAdministradorTitle">
        <h3>Notas</h3>
      </div>
      <div className="VNotDocAdminCamb">
      <VNotasDocenteAdministradorCursos />
      </div>
    </div>
  );
}

export default VNotasDocenteAdministrador;
