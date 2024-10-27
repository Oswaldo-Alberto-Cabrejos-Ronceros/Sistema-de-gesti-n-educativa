import React from "react";
import CardCursoDocente from "../generalsComponets/CardCursoDocente/CardCursoDocente";
import "./VCursosAdministrador.css";
import { Link } from "react-router-dom";
import SelectComponent from "../generalsComponets/SelectComponent/SelectComponent";


function VCursosAdministrador({ cursos }) {
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
    <div className="VCursosAdministradorContainer">
      <div className="VCursosAdministradorTitleContainer">
        <h3>Mis cursos</h3>
      </div>
      <div className="SelectCursosAdministradorGeneralContainer">
      <div className="SelectCursosAdministradorContainer">
      <SelectComponent name={"Nivel"} options={optionsNivel} />
        <SelectComponent name={"Grado"} options={optionsGrado} />
        <SelectComponent name={"Seccion"} options={optionsSeccion} />
      </div>
      </div>
      {cursos.map((curso) => {
        return (
          <Link to="/administrador/curso" state={{ curso }} className="LinkCardsCursosAdministrador">
            <CardCursoDocente curso={curso} />
          </Link>
        );
      })}
    </div>
  );
}

export default VCursosAdministrador;
