import React from "react";
import "./VCursoDocenteContenido.css";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import ComBoxCursoXUnidadDocente from "../../generalsComponets/ComBoxCursoXUnidadDocente/ComBoxCursoXUnidadDocente";
import { useLocation } from "react-router-dom";

function VCursoDocenteContenido() {
  const location= useLocation();
  const {curso}=location.state || {};
  const onClick1 = function () {
    alert("Presionando boton Contenido");
  };
  const onClick2 = function () {
    alert("Presionando boton Tareas");
  };
  const contenidos = [
    [
      {
        nombre: "Angulos Trigonometricos 1",
        link: "https://www.youtube.com/",
      },
      {
        nombre: "Angulos Trigonometricos 2",
        link: "https://www.youtube.com/",
      },
    ],
    [
      { nombre: "Angulos Complementarios 1", link: "https://www.youtube.com/" },
      {
        nombre: "Angulos Complementarios 2",
        link: "https://www.youtube.com/",
      },
    ],
    [
      {
        nombre: "Angulos Suplementarios 1",
        link: "https://www.youtube.com/",
      },
      {
        nombre: "Angulos Suplementarios 2",
        link: "https://www.youtube.com/",
      },
    ],
  ];
  let unidad="Unidad ";
  let numerounidad=1;
  let unidadString;
  return (
    <div className="VCursoDocenteDetalleContainer">
      <div className="VCursoDocenteDetalleTitle">
        <h3>{curso}</h3>
      </div>
      <div className="VCurDoButtonsContainer">
        <PrimaryButton onClick={onClick1} nombre={"Contenido"} />
        <PrimaryButton onClick={onClick2} nombre={"Tareas"} />
      </div>
      { 
      contenidos.map((contenido)=>{
        unidadString=unidad+numerounidad;
        numerounidad++;
        return <ComBoxCursoXUnidadDocente unidad={unidadString} contenidos={contenido} />
      })
        }
    </div>
  );
}

export default VCursoDocenteContenido;
