import React from "react";
import "./VHonorDocenteAdministrador.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardHonor from "../../generalsComponets/CardHonor/CardHonor";

function VHonorDocenteAdministradorBimestral({info, estudiantesHonor}) {
  let optionsBimestre = [
    "Bimestre 1",
    "Bimestre 2",
    "Bimestre 3",
    "Bimestre 4",
  ];
  let optionsNivel = ["Primaria", "Secundaria"];
  let optionsGrado = [
    "1er Grado",
    "2do Grado",
    "3er Grado",
    "4to Grado",
    "5to Grado",
    "6to Grado",
  ];
  let optionsSeccion = ["Unica", "A", "B"];
  return (
    <div className="VHonorDocenteAdministradorBimestralContainer">
      <div className="VHonorDocenteAdministradorBimestralTitleContainer">
        <h3>Bimestre</h3>
      </div>
      <div className="SelectHonorDocenteAdministradorBimestralContainer">
        <SelectComponent name={"Nivel"} options={optionsNivel}/>
        <SelectComponent name={"Grado"} options={optionsGrado} />
        <SelectComponent name={"Seccion"} options={optionsSeccion}/>
        <SelectComponent name={"Unidad"} options={optionsBimestre} />
      </div>
      <div className="VHonorDocenteAdministradorBimestralContent">
        <CardHonor info={info} estudiantesHonor={estudiantesHonor}/>
      </div>
    </div>
  );
}

export default VHonorDocenteAdministradorBimestral;
