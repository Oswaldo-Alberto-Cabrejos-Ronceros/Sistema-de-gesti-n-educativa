import React from 'react'
import './VVerContenidoGeneral.css'
import { useLocation } from "react-router-dom";
import CardContenidoCurso from '../generalsComponets/CardContenidoCurso/CardContenidoCurso'


function VVerContenidoGeneral() {
  const location= useLocation();
  const {contenido}=location.state;
  return (
    <div className='VVerContenidoGeneralContainer'>
        <CardContenidoCurso contenido={contenido}/>
    </div>
  )
}

export default VVerContenidoGeneral