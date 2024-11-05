import React from 'react'
import './VCursosEstudiante.css'
import CardCursoEstudiante from '../generalsComponets/CardCursoEstudiante/CardCursoEstudiante';
import { Link } from 'react-router-dom';

function VCursosEstudiante({ cursos }) {
  return (
    <div className="CursosEstudianteContainer">
      <div className="VCursosEstudianteTitle">
        <h3>Mis cursos</h3>
      </div>
      {cursos.map((curso, index) => (
        <Link key={index} className="LinkCursoCardEstudiante" to="/estudiante/curso" state={{ curso }}>
          <CardCursoEstudiante curso={curso} />
        </Link>
      ))}
    </div>
  );
}

export default VCursosEstudiante;