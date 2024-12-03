import React, { useEffect, useState } from "react";
import "./VCursosDocente.css";
import CardCursoDocente from "../generalsComponets/CardCursoDocente/CardCursoDocente";
import { Link } from "react-router-dom";
import subcursoService from "../../services/subcursoService";
import SelectComponent from "../generalsComponets/SelectComponent/SelectComponent";

function VCursosDocente({}) {
  const [cursos, setCursos] = useState([]);
  const [selectedGrado, setSelectedGrado] = useState(1);
  const [userDocente, setUserDocente] = useState({});
  const [componentToShow, setComponentToShow] = useState("Cursos");

  const optionsGradoPrimaria = [
    { label: "1er Grado", value: 1 },
    { label: "2do Grado", value: 2 },
    { label: "3er Grado", value: 3 },
    { label: "4to Grado", value: 4 },
    { label: "5to Grado", value: 5 },
    { label: "6to Grado", value: 6 },
  ];
  const optionsGradoSecundaria = [
    { label: "1er Año", value: 1 },
    { label: "2do Año", value: 2 },
    { label: "3er Año", value: 3 },
    { label: "4to Año", value: 4 },
    { label: "5to Año", value: 5 },
  ];

  const docentePrimaria = userDocente.nivel === "PRIMARIA";

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserDocente(userData || {});

    if (userData) {
      subcursoService
        .listarSubcursosPorUsuario(userData.usuarioId, userData.rol)
        .then((response) => {
          let grado = 0;
          setCursos(
            response.data.map((curso) => {
              const profesorAsignado =
                curso.asignacionesProfesor[0]?.profesor || {};
              return {
                Nombre: curso.nombre,
                Nivel: curso.nivel,
                SubcursoId: curso.subcursoId,
                Docente:
                  profesorAsignado.nombre && profesorAsignado.apellido
                    ? `${profesorAsignado.nombre} ${profesorAsignado.apellido}`
                    : "No asignado",
              };
            })
          );
        })
        .catch((error) => console.error("Error al obtener los cursos:", error));
    }
  }, []);

  const cursos2 = cursos.map((curso) => ({
    ...curso,
    Grado: selectedGrado,
  }));


  return (
    <div className="CursosDoContainer">
      <div className="VCursosDocenTitle">
        <h3>Mis cursos</h3>
      </div>
      <div className="VCursosDocenSelectContainer">
      <div className="FilterGroup">
          <label htmlFor="Grado">Grado:</label>
          <SelectComponent
            name="Grado"
            options={
              docentePrimaria ? optionsGradoPrimaria : optionsGradoSecundaria
            }
            value={selectedGrado}
            onChange={(e) => setSelectedGrado(e.target.value)}
          />
        </div>
      </div>
      <div className="VCursosDocenElementsContainer"> 
      {cursos.length===0?(<h2>Sin cursos asignados</h2>):(cursos2.map((curso) => (
        <div className="VCursosDocenElementContent">
          <Link
            to="/docente/curso"
            state={{ curso }}
            className="LinkCardsCursos"
          >
            <CardCursoDocente curso={curso} />
          </Link>
        </div>
      )))}
      </div>
    </div>
  );
}

export default VCursosDocente;
