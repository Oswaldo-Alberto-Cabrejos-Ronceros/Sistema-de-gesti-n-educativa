import React, { useEffect, useState } from "react";
import "./VSubirNotasDocenteAdministrador.css";
import TablaSubirNotasDocenteAdministrador from "./TablaSubirNotasDocenteAdministrador/TablaSubirNotasDocenteAdministrador";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";


function VSubirNotasDocenteAdministrador({ curso, alumnos }) {
  const [userDocente, setUserDocente] = useState({});
  const [selectedUnidad, setSelectedUnidad] = useState(1);
  const [unidadesDesbloqueadas, setUnidadesDesbloqueadas] = useState([true, ...Array(7).fill(false)]);
  


  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserDocente(userData || {});
  }, []);

 
  // Maneja cuando una unidad es completada
  const handleUnidadCompleta = () => {
    setUnidadesDesbloqueadas((prev) => {
      const updatedUnidades = [...prev];
      const nextUnidad = selectedUnidad;
      if (nextUnidad < 8) {
        updatedUnidades[nextUnidad] = true; // Desbloquear la siguiente unidad
      }
      return updatedUnidades;
    });
  };

  const unidades = [
    { label: "Unidad 1", value: 1 },
    { label: "Unidad 2", value: 2 },
    { label: "Unidad 3", value: 3 },
    { label: "Unidad 4", value: 4 },
    { label: "Unidad 5", value: 5 },
    { label: "Unidad 6", value: 6 },
    { label: "Unidad 7", value: 7 },
    { label: "Unidad 8", value: 8 },
  ];

  return (
    <div className="VSubirNotasContainer">
      <div className="VSubirNotasContent">
        <div className="InfoSubNot">
          <p className="PMd">Curso:</p>
          <p className="PMd">{curso.nombre}</p>
          <p className="PMd">Grado:</p>
          <p className="PMd">{curso.grado}</p>
          <p className="PMd">Sección:</p>
          <p className="PMd">{curso.seccion}</p>
          <p className="PMd">Nivel:</p>
          <p className="PMd">{curso.nivel}</p>
          <p className="PMd">Unidad:</p>
          <div className="SelectVSubirNotasContainer">
          <SelectComponent
            name="Unidad"
            options={unidades}
            value={selectedUnidad}
            onChange={(e) => setSelectedUnidad(Number(e.target.value))}
            /*disabledOptions={unidades.map((_, index) => !unidadesDesbloqueadas[index])}*/
          />
          </div>
        </div>
        <div className="IndicacionesContainer">
          <p className="PMd">Suba notas del 0 al 20, no deje alumnos con notas en blanco en una competencia, ya sea el caso,
            puede saltearse una competencia.</p>
        </div>
        <div className="ContSubNot">
          <TablaSubirNotasDocenteAdministrador
            alumnos={alumnos}
            subcursoId={curso.cursoId}
            unidad={selectedUnidad}
            competencias={["C1", "C2", "C3", "C4"]}
            onUnidadCompleta={handleUnidadCompleta} // Pasamos la función
          />
        </div>
      </div>
    </div>
  );
}

export default VSubirNotasDocenteAdministrador;


