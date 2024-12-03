import React from 'react'
import './CardTareaCurso.css'
import PrimaryButtonLarge from '../PrimaryButtonLarge/PrimaryButtonLarge'

function CardTareaCurso({tarea}) {
  const handleAbrirEnlace = () => {
    window.open(tarea.urlArchivo, "_blank"); 
  };
  return (
    <div className='CardTareaCursoContainer'>
      <div className="CardTareaCursoTitleContainer">
        <h3>{"Tarea: " + tarea.nombreContenido}</h3>
      </div>
      <div className="CardTareaCursoDescriptionContainer">
        <p className='PMd'>
        {tarea.descripcion}</p>
      </div>
      <div className="CardTareaCursoButtonContainer">
        <PrimaryButtonLarge nombre={"Descargar Archivo"} onClick={handleAbrirEnlace}/>
      </div>
    </div>
  )
}

export default CardTareaCurso