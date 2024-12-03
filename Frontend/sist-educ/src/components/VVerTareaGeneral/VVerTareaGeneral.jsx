import React from 'react'
import './VVerTareaGeneral.css'
import { useLocation } from "react-router-dom";
import CardTareaCurso from '../generalsComponets/CardTareaCurso/CardTareaCurso';

function VVerTareaGeneral() {
  
    const location= useLocation();
    const {tarea}=location.state;
  return (
    <div className='VVerTareaGeneralContainer'> 
    <CardTareaCurso tarea={tarea}/>
    </div>
  )
}

export default VVerTareaGeneral