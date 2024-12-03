import React from 'react'
import './VVerNotasDocenteAdministrador.css'
import TablaVerNotasDocente from '../../generalsComponets/TablaVerNotasDocenteAdministrador/TablaVerNotasDocenteAdministrador';
import { useLocation } from "react-router-dom";
import SelectComponent from '../../generalsComponets/SelectComponent/SelectComponent';

function VVerNotasDocenteAdministrador() {
  const location = useLocation();
  const {curso} = location.state;

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
        <TablaVerNotasDocente/>
        </div>
      </div>
  </div>
  )
}

export default VVerNotasDocenteAdministrador