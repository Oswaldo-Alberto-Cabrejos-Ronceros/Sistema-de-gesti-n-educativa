import React, { useEffect, useState } from "react";
import "./VNotasDocenteAdministradorCursos.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardCursoNotasDocente from "../CardCursoNotasDocenteAdministrador/CardCursoNotasDocenteAdministrador";
import VSubirNotasDocenteAdministrador from "../VSubirNotasDocenteAdministrador/VSubirNotasDocenteAdministrador";
import subcursoService from "../../../services/subcursoService";
import AlumnoService from "../../../services/alumnoService";

function VNotasDocenteAdministradorCursos() {
  const [selectedGrado, setSelectedGrado] = useState("SELECCIONAR");
  const [selectedSeccion, setSelectedSeccion] = useState("SELECCIONAR");
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
              const profesorAsignado =
                curso.asignacionesProfesor[0]?.profesor || {};
              return {
                nombre: curso.nombre,
                subcursoId: curso.subcursoId, // Guarda el subcursoId para usarlo en la selección
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

  const optionsGrado = [
    { label: "SELECCIONAR", value: "SELECCIONAR" },

    { label: "1er Grado", value: 1 },

    { label: "2do Grado", value: 2 },

    { label: "3er Grado", value: 3 },

    { label: "4to Grado", value: 4 },

    { label: "5to Grado", value: 5 },
  ];
  const optionsSeccion = ["SELECCIONAR", "Unica", "A", "B"];
  const optionCursos = [
    { label: "SELECCIONAR", value: "SELECCIONAR" },
    ...cursos.map((curso) => ({
      label: curso.nombre,
      value: curso.subcursoId,
    })),
  ];

  // Maneja el cambio del select de Curso y actualiza selectedCursoId
  const handleCursoChange = (e) => {
    const selectedOption = optionCursos.find(
      (opt) => opt.label === e.target.value
    );
    setSelectedCurso(e.target.value);
    setSelectedCursoId(selectedOption ? selectedOption.value : null);
  };

  // Efecto para obtener los alumnos según el grado y el subcurso seleccionado
  useEffect(() => {
    if (selectedCursoId && selectedGrado !== "SELECCIONAR") {
      AlumnoService.obtenerAlumnosPorGradoYSubcurso(
        selectedCursoId,
        selectedGrado
      )
        .then((response) => {
          console.log("Alumnos del curso y grado seleccionados:");
          setAlumnos(response.data);
        })
        .catch((error) =>
          console.error("Error al obtener los alumnos:", error)
        );
    }
  }, [selectedCursoId, selectedGrado]);

  const curso = {
    nombre: selectedCurso,
    grado: selectedGrado,
    seccion: selectedSeccion,
    nivel: "Primaria",
    cursoId:selectedCursoId,
  };

  console.log(alumnos);
  return (
    <div className="VNotasDocenteAdministradorCursosContainer">
      <div className="SelectNotasDocenteAdministradorCursosContainer">
        <SelectComponent
          name="Grado"
          options={optionsGrado}
          value={selectedGrado}
          onChange={(e) => setSelectedGrado(e.target.value)}
        />
        <SelectComponent
          name="Seccion"
          options={optionsSeccion}
          value={selectedSeccion}
          onChange={(e) => setSelectedSeccion(e.target.value)}
        />
        <SelectComponent
          name="Curso"
          options={optionCursos.map((opt) => opt.label)}
          value={selectedCurso}
          onChange={handleCursoChange}
        />
      </div>
      <div className="VNotasDocenteAdministradorCursosContent">
        <VSubirNotasDocenteAdministrador curso={curso} alumnos={alumnos} />
      </div>
    </div>
  );
}

export default VNotasDocenteAdministradorCursos;
