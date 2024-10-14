import React from 'react'
import './VNotasDocentes.css'
import CardCursoDocente from './CardCursoDocente/CardCursoDocente';

function VNotasDocentes() {
    let curso1={
      name:"Matematica",
      grado: "6to",
      seccion:"Unica",
      nivel:"Primaria"
    }
    let curso2={
      name:"Comunicacion",
      grado: "6to",
      seccion:"Unica",
      nivel:"Primaria"
    }
  return (
    <div className='VNotasDocenteContainer'>
        <h3 className='OpcionTitle'>Notas</h3>
        <div className='ElementsContainer'>
        <CardCursoDocente curso={curso1}/>
        <CardCursoDocente curso={curso2}/>
        </div>
    </div>
  )
}

export default VNotasDocentes