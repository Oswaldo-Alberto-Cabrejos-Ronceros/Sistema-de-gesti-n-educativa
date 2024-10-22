import React from "react";
import "./VHonorDocenteAdministradorUnidad.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardHonor from "../../generalsComponets/CardHonor/CardHonor";

function VHonorDocenteAdministradorUnidad({info, estudiantesHonor}) {
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
  let optionsNivel=[
    "Primaria",
    "Secundaria"
  ];
  let optionsGrado=[
    "1er Grado",
    "2do Grado",
    "3er Grado",
    "4to Grado",
    "5to Grado",
    "6to Grado"
  ];
  let optionsSeccion=[
    "Unica",
    "A",
    "B"
  ];
  return (
    <div className="VHonorDocenteAdministradorUnidadContainer">
      <div className="VHonorDocenteAdministradorUnidadTitleContainer">
        <h3>Unidad</h3>
      </div>
      <div className="SelectHonorDocenteAdministradorUnidadContainer">
        <SelectComponent name={"Nivel"} options={optionsNivel}/>
        <SelectComponent name={"Grado"} options={optionsGrado} />
        <SelectComponent name={"Seccion"} options={optionsSeccion}/>
        <SelectComponent name={"Unidad"} options={optionsUnidad} />
      </div>
      <div className="VHonorDocenteAdministradorUnidadContent">
        <CardHonor info={info} estudiantesHonor={estudiantesHonor}/>
      </div>
    </div>
  );
}

export default VHonorDocenteAdministradorUnidad;
