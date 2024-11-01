import React from "react";
import "./ComponentNotasEstudianteElement.css";
import { Link } from "react-router-dom";

function ComponentNotasEstudianteElement({ title, tipo }) {
  return (
    <div className="ComponentNotasEstudianteElementContainer">
      <Link
        to={`/estudiante/notas/info/${tipo}`}
        state={{ title }}
        className="LinkComponentNotasEstudianteElement"
      >
        <div className="ComponentNotasEstudianteElementContent">
          <p className="PLg">{title}</p>
        </div>
      </Link>
    </div>
  );
}

export default ComponentNotasEstudianteElement;
