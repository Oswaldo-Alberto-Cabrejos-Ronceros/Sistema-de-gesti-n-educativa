import React, { useEffect, useState } from "react";
import "./VNotasAdministrador.css";
import SelectComponent from "../generalsComponets/SelectComponent/SelectComponent";
import VSubirNotasDocenteAdministrador from "../VNotasDocenteAdministrador/VSubirNotasDocenteAdministrador/VSubirNotasDocenteAdministrador";
import subcursoService from "../../services/subcursoService";
import AlumnoService from "../../services/alumnoService";

function VNotasAdministrador() {
  const [selectedNivel, setSelectedNivel] = useState("PRIMARIA");
  const [selectedGrado, setSelectedGrado] = useState("SELECCIONAR");
  const [selectedSeccion, setSelectedSeccion] = useState("A");
  const [selectedCurso, setSelectedCurso] = useState("SELECCIONAR");
  const [selectedCursoId, setSelectedCursoId] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [userDocente, setUserDocente] = useState({});
  const optionsNivel = [    { label: "Primaria", value: "PRIMARIA" },
    { label: "Secundaria", value: "SECUNDARIA" },];
  const optionsGradoPrimaria = [
    { label: "Seleccionar Grado", value: "SELECCIONAR" },
    { label: "1er Grado", value: 1 },
    { label: "2do Grado", value: 2 },
    { label: "3er Grado", value: 3 },
    { label: "4to Grado", value: 4 },
    { label: "5to Grado", value: 5 },
    { label: "6to Grado", value: 6 },
  ];
  const optionsGradoSecundaria = [
    { label: "Seleccionar Año", value: "SELECCIONAR" },
    { label: "1er Año", value: 1 },
    { label: "2do Año", value: 2 },
    { label: "3er Año", value: 3 },
    { label: "4to Año", value: 4 },
    { label: "5to Año", value: 5 },
  ];

  useEffect(() => {
    if (selectedNivel) {
      subcursoService
        .getlistarSubcursosPorNivel(selectedNivel)
        .then((response) => {
          setCursos(response.data); // Actualizar el estado con los cursos obtenidos
        })
        .catch((error) => {
          console.error("Error al obtener los cursos:", error);
          setCursos([]); // Reiniciar cursos en caso de error
        });
    }
  }, [selectedNivel]);

  // Maneja el cambio del select de Curso y actualiza selectedCursoId
  const handleCursoChange = (e) => {
    const selectedOption = cursos.find(
      (curso) => curso.nombre === e.target.value
    );
    setSelectedCurso(e.target.value);
    setSelectedCursoId(selectedOption ? selectedOption.subcursoId : null);
  };

  useEffect(() => {
    if (selectedCursoId && selectedGrado !== "SELECCIONAR") {
      AlumnoService.obtenerAlumnosPorGradoYSubcurso(
        selectedCursoId,
        selectedGrado
      )
        .then((response) => {
          setAlumnos(response.data);
        })
        .catch((error) =>
          console.error("Error al obtener los alumnos:", error)
        );
    } else {
      setAlumnos([]); // Reiniciar lista si no se ha seleccionado Grado o Curso
    }
  }, [selectedCursoId, selectedGrado]);

  const curso = {
    nombre: selectedCurso,
    grado: selectedGrado,
    seccion: selectedSeccion,
    nivel: selectedNivel,
    cursoId: selectedCursoId,
  };

  return (
    <div className="VNotasAdministradorCursosContainer">
      <div className="VNotasAdministradorTitle">
        <h3>Notas</h3>
      </div>
      <div className="SelectNotasAdministradorCursosContainer">
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

        <div className="FilterGroup">
          <label htmlFor="Seccion">Seccion:</label>
          <SelectComponent
            name="Seccion"
            options={["A", "B"]}
            value={selectedSeccion}
            onChange={(e) => setSelectedSeccion(e.target.value)}
          />
        </div>

        <div className="FilterGroup">
          <label htmlFor="Curso">Curso:</label>

          <SelectComponent
            name="Curso"
            options={[{ label: "Seleccionar Curso", value: "SELECCIONAR" }, ...cursos.map((curso) => curso.nombre)]}
            value={selectedCurso}
            onChange={handleCursoChange}
          />
        </div>
      </div>
      <div className="VNotasAdministradorCursosContent">
        {selectedGrado === "SELECCIONAR" || selectedCurso === "SELECCIONAR" ? (
          <h3>Seleccione un grado y curso</h3>
        ) : (
          <VSubirNotasDocenteAdministrador curso={curso} alumnos={alumnos} />
        )}
      </div>
    </div>
  );
}

export default VNotasAdministrador;
