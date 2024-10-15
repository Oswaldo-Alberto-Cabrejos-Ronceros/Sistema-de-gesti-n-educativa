import React from "react";
import "./VHonorEstudiante.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VHonorEstudianteUnidad from "./VHonorEstudianteUnidad/VHonorEstudianteUnidad";
import VHonorEstudianteBimestral from "./VHonorEstudianteBimestral/VHonorEstudianteBimestral";
import {Routes, Route, Link} from "react-router-dom";

function VHonorEstudiante() {
  let info=["Primaria","6to","Unica", "3era Unidad"];
  let infoBimestral=["Primaria","6to","Unica","3er Bimestre"]
  let estudiantesHonor=[
    {
      Merito:1,
      Apellidos:"Rodriguez Pastor",
      Nombres:"Alberto Jorge",
      Promedio:18.5,
    },
    {
      Merito:2,
      Apellidos:"Yupa Mayuri",
      Nombres:"Karla Luisa",
      Promedio:18.1,
    },
    {
      Merito:3,
      Apellidos:"Cabrera Huanta",
      Nombres:"Xiomara Maria",
      Promedio:17.8,
    },
  ]
  return (
    <div className="VHonorEstudianteContainer">
      <div className="TitleHonorEstudiante">
        <h3>Honor</h3>
      </div>
      <div className="VHonorEstudianteButtonsContainer">
        <Link className="LinkVHonorEstudiante" to="unidad">
        <PrimaryButton nombre="Unidad"/>
        </Link>
        <Link className="LinkVHonorEstudiante" to="bimestral">
        <PrimaryButton nombre={"Bimestral"}/>
        </Link>
      </div>
      <div className="CambHonorEstudiante">
        <Routes>
          <Route index element={<VHonorEstudianteUnidad info={info} estudiantesHonor={estudiantesHonor}/>} />
          <Route path="unidad" element={<VHonorEstudianteUnidad info={info} estudiantesHonor={estudiantesHonor}/>}/>
          <Route path="bimestral" element={<VHonorEstudianteBimestral info={infoBimestral} estudiantesHonor={estudiantesHonor}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default VHonorEstudiante;
