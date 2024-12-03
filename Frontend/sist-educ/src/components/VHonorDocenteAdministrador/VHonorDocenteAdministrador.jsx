import React from "react";
import "./VHonorDocenteAdministrador.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VHonorDocenteUnidad from "../VHonorDocenteAdministrador/VHonorDocenteAdministradorUnidad/VHonorDocenteAdministradorUnidad";
import VHonorDocenteBimestral from "../VHonorDocenteAdministrador/VHonorDocenteAdministradorBimestral/VHonorDocenteAdministradorBimestral";

function VHonorDocenteAdministrador() {

  return (
    <div className="VHonorDocenteAdministradorContainer">
      <div className="VHonorDocenteAdministradorTitleContainer">
        <h3>Honor</h3>
      </div>
      <div className="CambVHonorDocenteAdministrador">
        <Routes>
          <Route index element={<VHonorDocenteUnidad/>} />
        </Routes>
      </div>
    </div>
  );
}

export default VHonorDocenteAdministrador;
