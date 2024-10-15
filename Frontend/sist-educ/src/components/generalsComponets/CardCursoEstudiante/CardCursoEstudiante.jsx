import React from 'react'
import './CardCursoEstudiante.css'

function CardCursoEstudiante({curso}) {
  return (
    <div className='CardContainer'>
    <div className='ImgContainer'></div>
    <div className='ContentContainer'>
    <p className='PLg'>{curso.Nombre}</p>
    <p className='PMd'>{curso.Docente}</p>
    </div>
    </div>
  )
}

export default CardCursoEstudiante