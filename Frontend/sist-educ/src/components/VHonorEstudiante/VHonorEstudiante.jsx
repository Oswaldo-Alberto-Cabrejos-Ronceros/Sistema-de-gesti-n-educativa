import React from "react";
import "./VHonorEstudiante.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VHonorEstudianteUnidad from "./VHonorEstudianteUnidad/VHonorEstudianteUnidad";
import VHonorEstudianteBimestral from "./VHonorEstudianteBimestral/VHonorEstudianteBimestral";

function VHonorEstudiante() {
  let fUnidad = function () {
    alert("Presionando Unidad");
  };
  let fBimestral = function () {
    alert("Presionando Bimestral");
  };
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
        <PrimaryButton onClick={fUnidad} nombre={"Unidad"} />
        <PrimaryButton onClick={fBimestral} nombre={"Bimestral"} />
      </div>
      <div className="CambHonorEstudiante">
        {/*<VHonorEstudianteUnidad info={info} estudiantesHonor={estudiantesHonor}/>*/}
        <VHonorEstudianteBimestral info={infoBimestral} estudiantesHonor={estudiantesHonor}/>
      </div>
    </div>
  );
}

export default VHonorEstudiante;
