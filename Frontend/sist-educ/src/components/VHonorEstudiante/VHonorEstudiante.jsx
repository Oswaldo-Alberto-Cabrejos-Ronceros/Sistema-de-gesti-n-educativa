import React from "react";
import "./VHonorEstudiante.css";
import VHonorEstudianteUnidad from "./VHonorEstudianteUnidad/VHonorEstudianteUnidad";
import {Routes, Route} from "react-router-dom";

function VHonorEstudiante() {

  return (
    <div className="VHonorEstudianteContainer">
      <div className="TitleHonorEstudiante">
        <h3>Honor</h3>
      </div>
      <div className="CambHonorEstudiante">
        <Routes>
          <Route index element={<VHonorEstudianteUnidad/>} />
        </Routes>
      </div>
    </div>
  );
}

export default VHonorEstudiante;
