import React from 'react'
import './VVerNotasDocentes.css'
import TablaVerDocente from './TablaVerDocente/TablaVerDocente';

function VVerNotasDocentes({curso}) {
  const alumnos = [
    {
      Id: "5",
      Dni: "78984545",
      Nombres: "Alonzo Jorge",
      Apellidos: "Cardenas Godoy",
      C1:17,
      C2:16,
      C3:14
    },
    {
      Id: "8",
      Dni: "78848447",
      Nombres: "Karla Julia",
      Apellidos: "Fernandez Espinoza",
      C1:15,
      C2:16,
      C3:14
    },
    {
      Id: "7",
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
    <form action="">
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
          <select name="Unidad" id="Unidad" required>
          {
            unidades.map((unidad)=>
            <option value={unidad}>{unidad}</option>
            )
          }
          </select>
        </div>
        <div className="ContVerNot">
        <TablaVerDocente alumnosNotas={alumnos}/>
        </div>

      </div>
    </form>
  </div>
  )
}

export default VVerNotasDocentes