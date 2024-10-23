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
        <Routes>
          <Route index element={<VNotasDocenteAdministradorCursos />} />
          <Route path="cursos" element={<VNotasDocenteAdministradorCursos />} />
          <Route path="subirnotas" element={<VSubirNotasDocente />} />
          <Route path="vernotas" element={<VVerNotasDocente/>} />
        </Routes>
      </div>
    </div>
  );
}

export default VNotasDocenteAdministrador;
