import React from "react";
import "./VTareasEstudiante.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VTareasEstudiantePorCurso from "./VTareasEstudiantePorCurso/VTareasEstudiantePorCurso";
import VTareasEstudiantePorFecha from "./VTareasEstudiantePorFecha/VTareasEstudiantePorFecha";
import VVerTareaGeneral from "../VVerTareaGeneral/VVerTareaGeneral";

function VTareasEstudiante() {
  const tareasCurso = [
  ];

  const tareasPorFecha = [
  ];

  return (
    <div className="VTareasEstudianteContainer">
      <div className="VTareasEstudianteDetalleTitle">
        <h3>Tareas</h3>
      </div>
      <div className="VTareasEstudianteButtonsContainer">
        <Link className="LinkVTareasEstCont" to="fecha">
          <PrimaryButton nombre={"Por fecha"} />
        </Link>
        <Link className="LinkVTareasEstCont" to="curso">
          <PrimaryButton nombre={"Por curso"} />
        </Link>
      </div>
      <div className="VTareasEstudianteCamb">
        <Routes>
          <Route
            index
            element={<Navigate to="fecha" replace state={{ tareasPorFecha }} />}
          />
          <Route path="fecha/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="fecha/*"
            element={
              <VTareasEstudiantePorFecha
                to={"descripcion"}
                tareasPorFecha={tareasPorFecha}
                tareas={tareasPorFecha}
              />
            }
          />
          <Route path="curso/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="curso/*"
            element={
              <VTareasEstudiantePorCurso
                to={"descripcion"}
                tareasCurso={tareasCurso}
                tareas={tareasCurso}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default VTareasEstudiante;
