import React from "react";
import "./VHonorDocenteAdministrador.css";
import { Routes, Route, Link } from "react-router-dom";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VHonorDocenteUnidad from "../VHonorDocenteAdministrador/VHonorDocenteAdministradorUnidad/VHonorDocenteAdministradorUnidad";
import VHonorDocenteBimestral from "../VHonorDocenteAdministrador/VHonorDocenteAdministradorBimestral/VHonorDocenteAdministradorBimestral";

function VHonorDocenteAdministrador() {
  let info = ["Primaria", "6to", "Unica", "3era Unidad"];
  let infoBimestral = ["Primaria", "6to", "Unica", "3er Bimestre"];
  let estudiantesHonor = [
    {
      Merito: 1,
      Apellidos: "Rodriguez Pastor",
      Nombres: "Alberto Jorge",
      Promedio: 18.5,
    },
    {
      Merito: 2,
      Apellidos: "Yupa Mayuri",
      Nombres: "Karla Luisa",
      Promedio: 18.1,
    },
    {
      Merito: 3,
      Apellidos: "Cabrera Huanta",
      Nombres: "Xiomara Maria",
      Promedio: 17.8,
    },
  ];
  return (
    <div className="VHonorDocenteAdministradorContainer">
      <div className="VHonorDocenteAdministradorTitleContainer">
        <h3>Honor</h3>
      </div>
      <div className="VHonorDocenteAdministradorButtonsContainer">
        <Link className="LinkVHonorDocenteAdministrador" to="unidad">
        <PrimaryButton nombre="Unidad"/>
        </Link>
        <Link className="LinkVHonorDocenteAdministrador" to="bimestral">
        <PrimaryButton nombre={"Bimestral"}/>
        </Link>
      </div>
      <div className="CambVHonorDocenteAdministrador">
        <Routes>
          <Route index element={<VHonorDocenteUnidad info={info} estudiantesHonor={estudiantesHonor}/>} />
          <Route path="unidad" element={<VHonorDocenteUnidad info={info} estudiantesHonor={estudiantesHonor}/>}/>
          <Route path="bimestral" element={<VHonorDocenteBimestral info={infoBimestral} estudiantesHonor={estudiantesHonor}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default VHonorDocenteAdministrador;