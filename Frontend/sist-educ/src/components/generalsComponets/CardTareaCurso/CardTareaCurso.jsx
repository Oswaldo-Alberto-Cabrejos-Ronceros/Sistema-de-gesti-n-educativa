import React from 'react'
import './CardTareaCurso.css'
import PrimaryButtonLarge from '../PrimaryButtonLarge/PrimaryButtonLarge'

function CardTareaCurso({tarea}) {
  return (
    <div className='CardTareaCursoContainer'>
      <div className="CardTareaCursoTitleContainer">
        <h3>{tarea.nombre}</h3>
      </div>
      <div className="CardTareaCursoDescriptionContainer">
        <p className='PMd'>
        {tarea.descripcion}</p>
      </div>
      <div className='CardTareaCursoFechaEntregaContainer'>
        <p className='PMd'>
        {"Fecha de entrega: " + tarea.fechaEntrega}
        </p>
      </div>
      <div className="CardTareaCursoButtonContainer">
        <PrimaryButtonLarge nombre={"Descargar Archivo"} />
      </div>
    </div>
  )
}

export default CardTareaCurso