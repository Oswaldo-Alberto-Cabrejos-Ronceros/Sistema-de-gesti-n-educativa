import React, { useEffect, useState } from "react";
import "./VSubirNotasDocenteAdministrador.css";
import TablaSubirNotasDocente from "./TablaSubirNotasDocenteAdministrador/TablaSubirNotasDocenteAdministrador";
import ButtonSubtmit from "../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import { useLocation } from "react-router-dom";

function VSubirNotasDocenteAdministrador({ curso, alumnos }) {
  const [userDocente, setUserDocente] = useState({});
  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserDocente(userData || {});},[]);
    console.log(userDocente)
    console.log(alumnos);
    console.log(curso);

    const [selectedUnidad, setSelectedUnidad] = useState("SELECCIONAR");

  const unidades = [
    { label: "SELECCIONAR", value: "SELECCIONAR" },
    { label: "Unidad 1", value: 1 },
    { label: "Unidad 2", value: 2 },
    { label: "Unidad 3", value: 3 },
    { label: "Unidad 4", value: 4 },
    { label: "Unidad 5", value: 5 },
    { label: "Unidad 6", value: 6 },
    { label: "Unidad 7", value: 7 },
    { label: "Unidad 8", value: 8 },
  ];

  return (
    <div className="VSubirNotasContainer">
      <div className="VSubirNotasContent">
        <div className="InfoSubNot">
          <p className="PMd">Curso:</p>
          <p className="PMd">{curso.nombre}</p>
          <p className="PMd">Grado:</p>
          <p className="PMd">{curso.grado}</p>
          <p className="PMd">Seccion:</p>
          <p className="PMd">{curso.seccion}</p>
          <p className="PMd">Nivel:</p>
          <p className="PMd">{userDocente.nivel}</p>
          <p className="PMd">Unidad:</p>
          <SelectComponent name="Unidad" options={unidades} onChange={(e) => setSelectedUnidad(e.target.value)} />
        </div>
        <div className="IndicacionesContainer">
          <p className="PMd">
            Suba notas del 0 al 20, no deje alumnos con notas en blanco
          </p>
        </div>
        <div className="ContSubNot">
          <TablaSubirNotasDocente
            alumnos={alumnos}
            subcursoId={curso.cursoId}
            unidad={selectedUnidad}
            competencias={["C1", "C2", "C3","C4"]}
          />
        </div>
      </div>
    </div>
  );
}

export default VSubirNotasDocenteAdministrador;
