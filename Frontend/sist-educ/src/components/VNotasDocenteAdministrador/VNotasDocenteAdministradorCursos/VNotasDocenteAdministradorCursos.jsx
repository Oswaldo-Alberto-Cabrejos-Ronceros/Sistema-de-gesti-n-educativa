import React, { useEffect, useState } from "react";
import "./VNotasDocenteAdministradorCursos.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import VSubirNotasDocenteAdministrador from "../VSubirNotasDocenteAdministrador/VSubirNotasDocenteAdministrador";
import subcursoService from "../../../services/subcursoService";
import AlumnoService from "../../../services/alumnoService";

function VNotasDocenteAdministradorCursos() {
  const [selectedGrado, setSelectedGrado] = useState("SELECCIONAR");
  const [selectedSeccion, setSelectedSeccion] = useState("A");
  const [selectedCurso, setSelectedCurso] = useState("SELECCIONAR");
  const [selectedCursoId, setSelectedCursoId] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [userDocente, setUserDocente] = useState({});

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserDocente(userData || {});

    if (userData) {
      subcursoService
        .listarSubcursosPorUsuario(userData.usuarioId, userData.rol)
        .then((response) => {
          setCursos(
            response.data.map((curso) => {
              const profesorAsignado = curso.asignacionesProfesor[0]?.profesor || {};
              return {
                nombre: curso.nombre,
                subcursoId: curso.subcursoId,
                nivel: curso.nivel,
                docente:
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

  // Maneja el cambio del select de Curso y actualiza selectedCursoId
  const handleCursoChange = (e) => {
    const selectedOption = cursos.find((curso) => curso.nombre === e.target.value);
    setSelectedCurso(e.target.value);
    setSelectedCursoId(selectedOption ? selectedOption.subcursoId : null);
  };

  useEffect(() => {
    if (selectedCursoId && selectedGrado !== "SELECCIONAR") {
      AlumnoService.obtenerAlumnosPorGradoYSubcurso(selectedCursoId, selectedGrado)
        .then((response) => {
          console.log("Alumnos del curso y grado seleccionados:");
          setAlumnos(response.data);
        })
        .catch((error) => console.error("Error al obtener los alumnos:", error));
    } else {
      setAlumnos([]); // Reiniciar lista si no se ha seleccionado Grado o Curso
    }
  }, [selectedCursoId, selectedGrado]);

  const curso = {
    nombre: selectedCurso,
    grado: selectedGrado,
    seccion: selectedSeccion,
    nivel: "Primaria",
    cursoId: selectedCursoId,
  };

  return (
    <div className="VNotasDocenteAdministradorCursosContainer">
      <div className="SelectNotasDocenteAdministradorCursosContainer">
        <SelectComponent
          name="Grado"
          options={[
            { label: "SELECCIONAR", value: "SELECCIONAR" },
            { label: "1er Grado", value: 1 },
            { label: "2do Grado", value: 2 },
            { label: "3er Grado", value: 3 },
            { label: "4to Grado", value: 4 },
            { label: "5to Grado", value: 5 },
          ]}
          value={selectedGrado}
          onChange={(e) => setSelectedGrado(e.target.value)}
        />
        <SelectComponent
          name="Seccion"
          options={["A", "B"]}
          value={selectedSeccion}
          onChange={(e) => setSelectedSeccion(e.target.value)}
        />
        <SelectComponent
          name="Curso"
          options={["SELECCIONAR", ...cursos.map((curso) => curso.nombre)]}
          value={selectedCurso}
          onChange={handleCursoChange}
        />
      </div>
      <div className="VNotasDocenteAdministradorCursosContent">
        {selectedGrado === "SELECCIONAR" || selectedCurso === "SELECCIONAR" ? (
          <h3>Seleccione un grado y curso</h3>
        ) : (
          <VSubirNotasDocenteAdministrador curso={curso} alumnos={alumnos} />
        )}
      </div>
    </div>
  );
}

export default VNotasDocenteAdministradorCursos;

