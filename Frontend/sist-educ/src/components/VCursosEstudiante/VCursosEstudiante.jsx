import React from 'react'
import './VCursosEstudiante.css'
import CardCursoEstudiante from '../generalsComponets/CardCursoEstudiante/CardCursoEstudiante';
import { Link } from 'react-router-dom';

function VCursosEstudiante({cursos}) {
  let cursosarray=[...cursos];
  return (
    <div className='CursosEstudianteContainer'>
      <div className='VCursosEstudianteTitle'>
      <h3>Mis cursos</h3>
      </div>
        {
          cursosarray.map((curso)=>{
            return <Link className='LinkCursoCardEstudiante' to="/curso" state={{curso}}><CardCursoEstudiante curso={curso}/></Link>
          })
        }
    </div>
  )
}

export default VCursosEstudiante