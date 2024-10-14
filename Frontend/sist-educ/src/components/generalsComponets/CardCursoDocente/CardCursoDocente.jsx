import React from 'react'
import './CardCursoDocente.css'

function CardCursoDocente({curso}) {
  return (
    <div className='CardDocenteContainer'>
    <div className='ImgDocenteContainer'></div>
    <div className='ContentContainerDocente'>
    <p className='PLg'>{curso.Nombre}</p>
    <p className='PMd'>{curso.Grado}</p>
    <p className='PMd'>{curso.Docente}</p>
    </div>
    </div>
  )
}

export default CardCursoDocente
