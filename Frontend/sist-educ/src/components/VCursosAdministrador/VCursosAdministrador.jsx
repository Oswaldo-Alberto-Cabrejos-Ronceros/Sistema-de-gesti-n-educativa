import React, { useEffect, useState } from "react";
import CardCursoDocente from "../generalsComponets/CardCursoDocente/CardCursoDocente";
import "./VCursosAdministrador.css";
import { Link } from "react-router-dom";
import SelectComponent from "../generalsComponets/SelectComponent/SelectComponent";
import subcursoService from "../../services/subcursoService";

function VCursosAdministrador({}) {
  const [selectedNivel, setSelectedNivel] = useState("PRIMARIA");
  const [selectedGrado, setSelectedGrado] = useState(1);
  const [cursos, setCursos] = useState([]);
  const [userDocente, setUserDocente] = useState({});
  const optionsNivel = [
    { label: "Primaria", value: "PRIMARIA" },
    { label: "Secundaria", value: "SECUNDARIA" },
  ];
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

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserDocente(userData || {});

    if (userData) {
      if (selectedNivel) {
        subcursoService
          .getlistarSubcursosPorNivel(selectedNivel)
          .then((response) => {
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
            ); // Actualizar el estado con los cursos obtenidos
          })
          .catch((error) => {
            console.error("Error al obtener los cursos:", error);
            setCursos([]); // Reiniciar cursos en caso de error
          });
      }
    }
  }, [selectedNivel]);

  const cursos2 = cursos.map((curso) => ({
    ...curso,
    Grado: selectedGrado,
  }));


  return (
    <div className="VCursosAdministradorContainer">
      <div className="VCursosAdministradorTitleContainer">
        <h3>Mis cursos</h3>
      </div>
      <div className="SelectCursosAdministradorGeneralContainer">
        <div className="SelectCursosAdministradorContainer">
          <div className="FilterGroup">
            <label htmlFor="Nivel">Nivel:</label>
            <SelectComponent
              name="Nivel"
              options={optionsNivel}
              value={selectedNivel}
              onChange={(e) => setSelectedNivel(e.target.value)}
            />
          </div>
          <div className="FilterGroup">
            <label htmlFor="Grado">Grado:</label>

            <SelectComponent
              name="Grado"
              options={
                selectedNivel === "PRIMARIA"
                  ? optionsGradoPrimaria
                  : optionsGradoSecundaria
              }
              value={selectedGrado}
              onChange={(e) => setSelectedGrado(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="VCursosAdministradorElementsContainer">
        {cursos2.length===0?(<h2>Sin cursos asignados</h2>):(cursos2.map((curso) => {
          return (
            <div className="VCursosAdministradorElementContent">
              <Link
                to="/administrador/curso"
                state={{ curso }}
                className="LinkCardsCursosAdministrador"
              >
                <CardCursoDocente curso={curso} />
              </Link>
            </div>
          );
        }))}
      </div>
    </div>
  );
}

export default VCursosAdministrador;
