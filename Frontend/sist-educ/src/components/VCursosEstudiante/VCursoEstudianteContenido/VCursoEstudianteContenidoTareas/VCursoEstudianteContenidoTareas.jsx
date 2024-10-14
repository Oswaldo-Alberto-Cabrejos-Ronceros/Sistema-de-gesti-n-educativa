import React from 'react'
import './VCursoEstudianteContenidoTareas.css'
import ComBoxCursoXUnidadEstudiante from '../../../generalsComponets/ComBoxCursoXUnidadEstudiante/ComBoxCursoXUnidadEstudiante';

function VCursoEstudianteContenidoTareas({tareas}) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className='VCursoEstudianteContenidoTareasContainer'>
                      {tareas.map((tarea) => {
        unidadString = unidad + numerounidad;
        numerounidad++;
        return (
          <ComBoxCursoXUnidadEstudiante
            unidad={unidadString}
            contenidos={tarea}
          />
        );
      })}
    </div>
  )
}

export default VCursoEstudianteContenidoTareas