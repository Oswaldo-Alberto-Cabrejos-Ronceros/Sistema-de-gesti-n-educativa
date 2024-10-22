import React from 'react'
import './VVerNotasDocenteAdministrador.css'
import TablaVerNotasDocente from '../../generalsComponets/TablaVerNotasDocenteAdministrador/TablaVerNotasDocenteAdministrador';
import { useLocation } from "react-router-dom";
import SelectComponent from '../../generalsComponets/SelectComponent/SelectComponent';

function VVerNotasDocenteAdministrador() {
  const location = useLocation();
  const {curso} = location.state;
  console.log(curso)
  const alumnos = [
    {
      "N°": "5",
      Dni: "78984545",
      Nombres: "Alonzo Jorge",
      Apellidos: "Cardenas Godoy",
      C1:17,
      C2:16,
      C3:14
    },
    {
      "N°": "8",
      Dni: "78848447",
      Nombres: "Karla Julia",
      Apellidos: "Fernandez Espinoza",
      C1:15,
      C2:16,
      C3:14
    },
    {
      "N°": "7",
      Dni: "78945612",
      Nombres: "Luis Hermenegildo",
      Apellidos: "Castillo Cerron",
      C1:18,
      C2:19,
      C3:20
    },
  ];
  const unidades = [
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
    <div className="VVerNotasContainer">
    <div className="OpcionTitleVVerNotasDocentes">
      <h3>Ver Notas</h3>
    </div>
      <div className="VVerNotasContent">
        <div className="InfoVerNot">
          <p className="PMd">Curso:</p>
          <p className="PMd">{curso.nombre}</p>
          <p className="PMd">Grado:</p>
          <p className="PMd">{curso.grado}</p>
          <p className="PMd">Seccion:</p>
          <p className="PMd">{curso.seccion}</p>
          <p className="PMd">Nivel:</p>
          <p className="PMd">{curso.nivel}</p>
          <p className="PMd">Unidad:</p>
          <SelectComponent name={"Unidad"} options={unidades}/>
        </div>
        <div className="ContVerNot">
        <TablaVerNotasDocente alumnosNotas={alumnos}/>
        </div>
      </div>
  </div>
  )
}

export default VVerNotasDocenteAdministrador