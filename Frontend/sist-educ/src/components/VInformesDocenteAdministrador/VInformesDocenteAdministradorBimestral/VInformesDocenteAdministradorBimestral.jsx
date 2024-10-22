import React from "react";
import "./VInformesDocenteAdministradorBimestral.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardInformeDocenteAdministrador from "../../generalsComponets/CardInformeDocenteAdministrador/CardInformeDocenteAdministrador";

function VInformesDocenteAdministradorBimestral() {
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

  let optionsCursos = [
    "Matematicas",
    "Comunicación",
    "Inglés",
    "Personal Social",
    "Ciencia y Tecnología",
  ];
  let optionsBimestre = [
    "Bimestre 1",
    "Bimestre 2",
    "Bimestre 3",
    "Bimestre 4",
  ];

  let infoBimestral = ["Primaria", "6to", "Unica", "2do Bimestre"];
  let estudiantesNotas = [
    {
      "N°": 1,
      Apellidos: "Rodriguez Pastor",
      Nombres: "Alberto Jorge",
      Promedio: 18.5,
    },
    {
      "N°": 2,
      Apellidos: "Yupa Mayuri",
      Nombres: "Karla Luisa",
      Promedio: 18.1,
    },
    {
      "N°": 3,
      Apellidos: "Cabrera Huanta",
      Nombres: "Xiomara Maria",
      Promedio: 17.8,
    },
  ];


  return (
    <div className="VInformesDocenteAdministradorBimestralContainer">
      <div className="VInformesDocenteAdministradorBimestralTitleContainer">
        <h3>Bimestral</h3>
      </div>
      <div className="SelectInformesDocenteAdministradorBimestralContainer">
        <SelectComponent name={"Nivel"} options={optionsNivel} />
        <SelectComponent name={"Grado"} options={optionsGrado} />
        <SelectComponent name={"Seccion"} options={optionsSeccion} />
        <SelectComponent name={"Cursos"} options={optionsCursos} />
        <SelectComponent name={"Bimestre"} options={optionsBimestre} />
      </div>
      <div className="VInformesDocenteAdministradorBimestralContent">
        <CardInformeDocenteAdministrador info={infoBimestral} estudiantesNotas={estudiantesNotas}/>
      </div>
    </div>
  );
}

export default VInformesDocenteAdministradorBimestral;
