import React from 'react'
import './VCursosDocente.css'
import CardCursoDocente from '../generalsComponets/CardCursoDocente/CardCursoDocente'
import { Link } from 'react-router-dom';

function VCursosDocente({cursos}) {
  return (
    <div className='CursosDoContainer'>
      <div className='VCursosDocenTitle'>
      <h3>Mis cursos</h3>
      </div>
        {
          cursos.map((curso)=>{
            return <Link to="/docente/curso" state={{curso}} className='LinkCardsCursos'><CardCursoDocente curso={curso}/></Link>
          })
        }
    </div>
  )
}

export default VCursosDocente