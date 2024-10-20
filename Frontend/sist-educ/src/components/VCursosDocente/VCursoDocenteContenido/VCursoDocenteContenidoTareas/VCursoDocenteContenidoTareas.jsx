import React from 'react'
import './VCursoDocenteContenidoTareas.css'
import ComBoxTareaXUnidadDocente from '../../../generalsComponets/ComBoxTareaXUnidadDocenteAdmin/ComBoxTareaXUnidadDocenteAdmin';

function VCursoDocenteContenidoTareas({tareas}) {
  console.log(tareas);
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className='VCursoDocenteContenidoTareasContainer'>
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
  )
}

export default VCursoDocenteContenidoTareas