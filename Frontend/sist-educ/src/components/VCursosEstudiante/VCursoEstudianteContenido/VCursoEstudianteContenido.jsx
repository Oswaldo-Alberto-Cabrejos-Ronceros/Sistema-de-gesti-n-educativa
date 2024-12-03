import React from "react";
import "./VCursoEstudianteContenido.css";
import { useLocation } from "react-router-dom";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import VCursoEstudianteContenidoContenido from "./VCursoEstudianteContenidoContenido/VCursoEstudianteContenidoContenido";
import VCursoEstudianteContenidoTareas from "./VCursoEstudianteContenidoTareas/VCursoEstudianteContenidoTareas";
import VVerContenidoGeneral from "../../VVerContenidoGeneral/VVerContenidoGeneral";
import VVerTareaGeneral from "../../VVerTareaGeneral/VVerTareaGeneral";

function VCursoEstudianteContenido({grado}) {
  const location = useLocation();
  let { curso } = location.state || {};
  if (curso === undefined) {
    curso = location.state.curso;
  }

  return (
    <div className="VCursoEstudianteDetalleContainer">
      <div className="VCursoEstudianteDetalleTitle">
        <h3>{curso.Nombre}</h3>
      </div>

      <div className="VCurEstudianteCamb">
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
              <VCursoEstudianteContenidoContenido
                to={"descripcion"}
                curso={curso}
                grado={grado}
                toTarea="tarea"
              />
            }
          />
          <Route path="tareas/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="tareas/*"
            element={
              <VCursoEstudianteContenidoTareas
                to={"descripcion"}
                curso={curso}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default VCursoEstudianteContenido;
