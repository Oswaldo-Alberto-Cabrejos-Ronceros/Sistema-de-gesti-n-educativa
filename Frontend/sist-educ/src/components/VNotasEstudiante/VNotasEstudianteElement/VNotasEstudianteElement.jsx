import React from "react";
import "./VNotasEstudianteElement.css";
import TablaNotasEstudiante from "../../generalsComponets/TablaNotasEstudiante/TablaNotasEstudiante";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import TablaNotasEstudianteCurso from "../../generalsComponets/TablaNotasEstudianteCurso/TablaNotasEstudianteCurso";

function VNotasEstudianteElement() {
  const location = useLocation();
  const { title } = location.state || {};
  const { tipo } = useParams();
  console.log(title);
  console.log(tipo);
  let notas = [
    {
      area: "Comunicacion",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    },
    {
      area: "Matematica",
      c1: 16,
      c2: 15,
      c3: 12,
      c4: "-",
      c5: "-",
      promedio: 17.5,
    },
    {
      area: "Personal Social",
      c1: 19,
      c2: 15,
      c3: 14,
      c4: "-",
      c5: 18,
      promedio: 17.5,
    },
    {
      area: "Religion",
      c1: 18,
      c2: 20,
      c3: "-",
      c4: "-",
      c5: "-",
      promedio: 17.5,
    },
  ];

  let notasCurso = [
    {
      unidad: "1ra",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    },
    {
      unidad: "2da",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    },
    {
      unidad: "3ra",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    },
    {
      unidad: "4ta",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    },
    {
      unidad: "5ta",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    },
    {
      unidad: "6ta",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    },    {
      unidad: "7ta",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    },
    {
      unidad: "8to",
      c1: 18,
      c2: 17,
      c3: 16,
      c4: 18,
      c5: 16,
      promedio: 17.5,
    }
  ];
  return (
    <div className="VNotasEstudianteElementContainer">
      <div className="TitleVNotasEstudianteElementContainer">
        <h3>{title}</h3>
      </div>
      <div className="VNotasEstudianteElementContent">
        {tipo === "curso" ? (
          <TablaNotasEstudianteCurso notas={notasCurso} />
        ) : (
          <TablaNotasEstudiante notas={notas} />
        )}
      </div>
    </div>
  );
}

export default VNotasEstudianteElement;
