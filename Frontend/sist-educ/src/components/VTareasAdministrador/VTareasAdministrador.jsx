import React from "react";
import "./VTareasAdministrador.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VTareasAdministradorPorCurso from "../VTareasAdministrador/VTareasAdministradorPorCurso/VTareasAdministradorPorCurso";
import VTareasAdminsitradorPorFecha from "../VTareasAdministrador/VTareasAdministradorPorFecha/VTareasAdministradorPorFecha";
import VVerTareaGeneral from "../VVerTareaGeneral/VVerTareaGeneral";

function VTareasAdministrador() {
  const tareas = [
  ];

  let tareasPorFecha = [
  ];
  return (
    <div className="VTareasAdministradorContainer">
      <div className="VTareasAdministradorTitle">
        <h3>Tareas</h3>
      </div>
      <div className="VTareasAdministradorButtonsContainer">
        <Link className="LinkVTareasAdministrador" to="fecha">
          <PrimaryButton nombre={"Por fecha"} />
        </Link>
        <Link className="LinkVTareasAdministrador" to="curso">
          <PrimaryButton nombre={"Por curso"} />
        </Link>
      </div>
      <div className="VTareasAdministradorCamb">
        <Routes>
          <Route
            index
            element={<Navigate to="fecha" replace state={{ tareasPorFecha }} />}
          />
          <Route path="fecha/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="fecha"
            element={
              <VTareasAdminsitradorPorFecha
                to={"descripcion"}
                tareasPorFecha={tareasPorFecha}
                tareas={tareasPorFecha}
              />
            }
          />
          <Route path="curso/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="curso"
            element={
              <VTareasAdministradorPorCurso
                to={"descripcion"}
                tareasCurso={tareas}
                tareas={tareas}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default VTareasAdministrador;
