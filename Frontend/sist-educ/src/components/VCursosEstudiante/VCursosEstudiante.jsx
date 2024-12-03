import React from "react";
import "./VCursosEstudiante.css";
import CardCursoEstudiante from "../generalsComponets/CardCursoEstudiante/CardCursoEstudiante";
import { Link } from "react-router-dom";
import { GiH2O } from "react-icons/gi";

function VCursosEstudiante({ cursos }) {
  return (
    <div className="CursosEstudianteContainer">
      <div className="VCursosEstudianteTitle">
        <h3>Mis cursos</h3>
      </div>
      <div className="VCursosEstudianteElementsContainer">
        {cursos.length === 0 ? (
          <h2>Sin cursos asignados</h2>
        ) : (
          cursos.map((curso, index) => (
            <div className="VCursosEstudianteElementContent">
              <Link
                key={index}
                className="LinkCursoCardEstudiante"
                to="/estudiante/curso"
                state={{ curso }}
              >
                <CardCursoEstudiante curso={curso} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default VCursosEstudiante;
