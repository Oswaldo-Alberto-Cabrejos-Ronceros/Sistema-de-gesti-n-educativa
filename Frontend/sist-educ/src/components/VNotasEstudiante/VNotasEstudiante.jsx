import React from "react";
import "./VNotasEstudiante.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VNotasEstudianteCurso from "../VNotasEstudiante/VNotasEstudianteCurso/VNotasEstudianteCurso";
import VNotasEstudianteUnidad from "./VNotasEstudianteUnidad/VNotasEstudianteUnidad";
import VNotasEstudianteBimestre from "../VNotasEstudiante/VNotasEstudianteBimestre/VNotasEstudianteBimestre";
import VNotasEstudianteElement from "./VNotasEstudianteElement/VNotasEstudianteElement";

function VNotasEstudiante() {
  return (
    <div className="VNotasEstudianteContainer">
      <div className="VNotasEstudianteTitle">
        <h3>Notas</h3>
      </div>
      <div className="VNotasEstudianteButtonsContainer">
        <Link className="LinkVNotasEstCont" to="curso">
          <PrimaryButton nombre={"Por curso"} />
        </Link>
        <Link className="LinkVNotasEstCont" to="unidad">
          <PrimaryButton nombre={"Por unidad"} />
        </Link>
        <Link className="LinkVNotasEstCont" to="bimestre">
          <PrimaryButton nombre={"Por bimestre"} />
        </Link>
      </div>
      <div className="VNotasEstudianteCamb">
        <Routes>
          <Route index element={<Navigate to={"curso"}/>} />
          <Route path="curso/*" element={<VNotasEstudianteCurso />} />
          <Route path="unidad/*" element={<VNotasEstudianteUnidad />} />
          <Route path="bimestre/*" element={<VNotasEstudianteBimestre />} />
          <Route path="info/:tipo" element={<VNotasEstudianteElement />} />
        </Routes>
      </div>
    </div>
  );
}

export default VNotasEstudiante;
