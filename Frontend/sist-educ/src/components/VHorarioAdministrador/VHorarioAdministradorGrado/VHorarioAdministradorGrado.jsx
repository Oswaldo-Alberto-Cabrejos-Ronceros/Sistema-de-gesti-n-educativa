import React, { useState } from "react";
import "./VHorarioAdministradorGrado.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardHorario from "../../generalsComponets/CardHorario/CardHorario";
import CardFormularioHorarioGrado from "../../generalsComponets/CardFormularioHorarioGrado/CardFormularioHorarioGrado";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";

function VHorarioAdministradorGrado() {
  const [formularioIsVisible, setformularioIsVisible] = useState(false);

  // Función para alternar la visibilidad
  const toggleVisibility = () => {
    setformularioIsVisible(!formularioIsVisible);
  };

  let horariosCurso = [
    {
      grado: "1er",
      nivel: "Primaria Unica",
    },
    {
      grado: "2do",
      nivel: "Primaria Unica",
    },
    {
      grado: "3er",
      nivel: "Primaria Unica",
    },
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
    <div className="VHorarioAdministradorGradoContainer">
      <div className="VHorarioAdministradorGradoTitleContainer">
        <h3>Grado</h3>
      </div>
      <div className="SelectHorarioAdministradorGradoGeneralContainer">
        <div className="SelectHorarioAdministradorGradoContainer">
          <SelectComponent name={"Nivel"} options={optionsNivel} />
          <SelectComponent name={"Grado"} options={optionsGrado} />
          <SelectComponent name={"Seccion"} options={optionsSeccion} />
        </div>
      </div>
      <div className="VHorarioAdministradorGradoContent">
        {horariosCurso.map((horario, index) => (
          <CardHorario
            key={index}
            grado={horario.grado}
            nivel={horario.nivel}
          />
        ))}
        <div className="ButtonFormularioContent">
        <PrimaryButton nombre={formularioIsVisible ? "Ocultar" : "Mostrar" } onClick={toggleVisibility}/>
        </div>
        {formularioIsVisible &&  <CardFormularioHorarioGrado />}
      </div>
    </div>
  );
}

export default VHorarioAdministradorGrado;
