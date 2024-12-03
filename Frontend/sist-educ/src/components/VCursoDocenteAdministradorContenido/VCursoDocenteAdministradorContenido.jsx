import React from "react";
import "./VCursoDocenteAdministradorContenido.css";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate} from "react-router-dom";
import VCursoDocenteContenidoContenido from "./VCursoDocenteAdministradorContenidoContenido/VCursosDocenteAdministradorContenidoContenido";
import VVerContenidoGeneral from "../VVerContenidoGeneral/VVerContenidoGeneral";
import VVerTareaGeneral from "../VVerTareaGeneral/VVerTareaGeneral";

function VCursoDocenteAdministradorContenido() {
  const location = useLocation();
  let { curso } = location.state || {};
  if (curso === undefined) {
    curso = location.state.curso;
  }

  return (
    <div className="VCursoDocenteContenidoContainer">
      <div className="VCursoDocenteContenidoTitle">
        <h3>{curso.Nombre + " - " + curso.Grado}</h3>
      </div>
      <div className="VCurDocenCamb">
        <Routes>
        <Route
            index
            element={<Navigate to="contenido" replace state={{ curso }} />}
          />
          <Route
            path="contenido/descripcion"
            element={<VVerContenidoGeneral />}
          />
          <Route path="contenido/tarea" element={<VVerTareaGeneral />} />
          <Route
            path="contenido/*"
            element={
              <VCursoDocenteContenidoContenido
                to="descripcion"
                toTarea="tarea"
                curso={curso}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default VCursoDocenteAdministradorContenido;
