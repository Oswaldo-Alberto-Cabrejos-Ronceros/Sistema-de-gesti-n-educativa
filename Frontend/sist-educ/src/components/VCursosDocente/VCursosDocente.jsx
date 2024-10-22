import React from 'react'
import './VCursosDocente.css'
import CardCursoDocente from '../generalsComponets/CardCursoDocente/CardCursoDocente'
import { Link } from 'react-router-dom';

function VCursosDocente({cursos}) {
  let cursosarray=[...cursos];
  return (
    <div className='CursosDoContainer'>
      <div className='VCursosDocenTitle'>
      <h3>Mis cursos</h3>
      </div>
        {
          cursosarray.map((curso)=>{
            return <Link to="/curso" state={{curso}} className='LinkCardsCursos'><CardCursoDocente curso={curso}/></Link>
          })
        }
    </div>
  )
}

export default VCursosDocente