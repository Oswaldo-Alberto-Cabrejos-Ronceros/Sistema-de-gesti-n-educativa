import React from "react";
import "./VHonorEstudianteUnidad.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardHonor from "../../generalsComponets/CardHonor/CardHonor"

function VHonorEstudianteUnidad({info, estudiantesHonor}) {
  let optionsUnidad = [
    "Unidad 1",
    "Unidad 2",
    "Unidad 3",
    "Unidad 4",
    "Unidad 5",
    "Unidad 6",
    "Unidad 7",
    "Unidad 8",
  ];
  return (
    <div className="VHonorEstudianteUnidadContainer">
      <div className="TitleHonorEstudianteUnidadContainer">
        <h3>Unidad</h3>
      </div>
      <div className="SelectUnidadHonorEstudianteContainer">
        <SelectComponent name={"Unidad"} options={optionsUnidad} />
      </div>
      <div className="VHonorEstudianteUnidadContent">
        <CardHonor info={info} estudiantesHonor={estudiantesHonor}/>
      </div>
    </div>
  );
}

export default VHonorEstudianteUnidad;
