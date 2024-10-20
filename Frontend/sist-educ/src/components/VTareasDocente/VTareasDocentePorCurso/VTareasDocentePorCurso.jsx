import React from 'react'
import './VTareasDocentePorCurso.css'
import ComBoxTareaXUnidadDocente from '../../generalsComponets/ComBoxTareaXUnidadDocenteAdmin/ComBoxTareaXUnidadDocenteAdmin'

function VTareasDocentePorCurso({tareas}) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className='VTareasDocentePorCursoContainer'>
      <div className="VTareasDocentePorCursoTitleContainer">
        <h3>Por curso</h3>
      </div>
      <div className="VTareasDocentePorCursoContent">
        {tareas.map((tarea) => {
          unidadString = unidad + numerounidad;
          numerounidad++;
          return (
            <ComBoxTareaXUnidadDocente
              unidad={unidadString}
              tareas={tarea}
            />
          );
        })}
      </div>
    </div>
  )
}

export default VTareasDocentePorCurso