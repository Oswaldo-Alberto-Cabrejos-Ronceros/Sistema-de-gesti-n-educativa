import React from "react";
import "./VTareasDocente.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VTareasDocentePorCurso from "../VTareasDocente/VTareasDocentePorCurso/VTareasDocentePorCurso";
import VTareasDocentePorFecha from "../VTareasDocente/VTareasDocentePorFecha/VTareasDocentePorFecha";
import VVerTareaGeneral from "../VVerTareaGeneral/VVerTareaGeneral";

function VTareasDocente() {
  const tareas = [
  ];
  let tareasPorFecha = [
  ];

  return (
    <div className="VTareasDocenteContainer">
      <div className="VTareasDocenteTitle">
        <h3>Tareas</h3>
      </div>
      <div className="VTareasDocenteButtonsContainer">
        <Link className="LinkVTareasDocCont" to="fecha">
          <PrimaryButton nombre={"Por fecha"} />
        </Link>
        <Link className="LinkVTareasDocCont" to="curso">
          <PrimaryButton nombre={"Por curso"} />
        </Link>
      </div>
      <div className="VTareasDocenteCamb">
        <Routes>
          <Route
            index
            element={<Navigate to="fecha" replace state={{ tareasPorFecha }} />}
          />
          <Route path="fecha/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="fecha/*"
            element={
              <VTareasDocentePorFecha
                to={"descripcion"}
                tareasPorFecha={tareasPorFecha}
                tareas={tareasPorFecha}
              />
            }
          />
          <Route path="curso/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="curso"
            element={<VTareasDocentePorCurso 
              to={"descripcion"}
              tareasCurso={tareas}
              tareas={tareas} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default VTareasDocente;
