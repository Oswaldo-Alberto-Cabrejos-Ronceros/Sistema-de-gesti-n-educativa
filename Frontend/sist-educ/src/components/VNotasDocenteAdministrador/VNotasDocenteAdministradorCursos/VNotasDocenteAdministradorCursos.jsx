import React from "react";
import "./VNotasDocenteAdministradorCursos.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardCursoNotasDocente from "../CardCursoNotasDocenteAdministrador/CardCursoNotasDocenteAdministrador";

function VNotasDocenteAdministradorCursos() {
  let cursos = [
    {
      nombre: "Matematica",
      grado: "6to",
      seccion: "Unica",
      nivel: "Primaria",
    },
    {
      nombre: "Comunicacion",
      grado: "6to",
      seccion: "Unica",
      nivel: "Primaria",
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
    <div className="VNotasDocenteAdministradorCursosContainer">
      <div className="SelectNotasDocenteAdministradorCursosContainer">
        <SelectComponent name={"Nivel"} options={optionsNivel} />
        <SelectComponent name={"Grado"} options={optionsGrado} />
        <SelectComponent name={"Seccion"} options={optionsSeccion} />
      </div>
      <div className="VNotasDocenteAdministradorCursosContent">
        {cursos.map((curso, index) => (
          <CardCursoNotasDocente key={index} curso={curso} />
        ))}
      </div>
    </div>
  );
}

export default VNotasDocenteAdministradorCursos;
