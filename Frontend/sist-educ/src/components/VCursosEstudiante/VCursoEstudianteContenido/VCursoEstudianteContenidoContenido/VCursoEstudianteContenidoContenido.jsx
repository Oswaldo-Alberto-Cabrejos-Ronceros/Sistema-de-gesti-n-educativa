import React from 'react'
import './VCursoEstudianteContenidoContenido.css'
import ComBoxCursoXUnidadEstudiante from '../../../generalsComponets/ComBoxCursoXUnidadEstudiante/ComBoxCursoXUnidadEstudiante';

function VCursoEstudianteContenidoContenido({to,toTarea,curso,grado}) {
  let unidadString = "Unidad ";
  const unidades=[1,2,3,4,5,6,7,8];
  return (
    <div className='VCursoEstudianteContenidoContenidoContainer'>
              {unidades.map((unidad) => {
        return (
          <ComBoxCursoXUnidadEstudiante
            unidad={unidadString + unidad}
            curso={curso}
            toTarea={toTarea}
            to={to}
            unidadNumero={unidad}
            grado={grado}
          />
        );
      })}
    </div>
  )
}

export default VCursoEstudianteContenidoContenido