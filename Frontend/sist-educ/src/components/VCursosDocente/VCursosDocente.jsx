import React from 'react'
import './VCursosDocente.css'
import CardCursoDocente from '../generalsComponets/CardCursoDocente/CardCursoDocente'

function VCursosDocente({cursos}) {
  let cursosarray=[...cursos];
  console.log(cursos);
  return (
    <div className='CursosDoContainer'>
      <div className='VCursosDocenTitle'>
      <h3>Mis cursos</h3>
      </div>
        {
          cursosarray.map((curso)=>{
            return <CardCursoDocente curso={curso}/>
          })
        }
    </div>
  )
}

export default VCursosDocente