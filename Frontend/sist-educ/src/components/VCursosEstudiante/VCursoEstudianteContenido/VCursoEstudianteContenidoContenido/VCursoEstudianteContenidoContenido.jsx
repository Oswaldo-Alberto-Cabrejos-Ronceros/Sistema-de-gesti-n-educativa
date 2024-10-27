import React from 'react'
import './VCursoEstudianteContenidoContenido.css'
import ComBoxCursoXUnidadEstudiante from '../../../generalsComponets/ComBoxCursoXUnidadEstudiante/ComBoxCursoXUnidadEstudiante';

function VCursoEstudianteContenidoContenido({to,curso,contenidos}) {
    let unidad = "Unidad ";
    let numerounidad = 1;
    let unidadString;
  return (
    <div className='VCursoEstudianteContenidoContenidoContainer'>
              {contenidos.map((contenido) => {
        unidadString = unidad + numerounidad;
        numerounidad++;
        return (
          <ComBoxCursoXUnidadEstudiante
            unidad={unidadString}
            contenidos={contenido}
            curso={curso}
            to={to}
          />
        );
      })}
    </div>
  )
}

export default VCursoEstudianteContenidoContenido