import React, { useEffect, useState } from "react";
import "./VInformesDocenteAdministradorAuxiliar.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardInformeDocenteAdministrador from "../../generalsComponets/CardInformeDocenteAdministrador/CardInformeDocenteAdministrador";
import subcursoService from "../../../services/subcursoService";
import AlumnoService from "../../../services/alumnoService";
import NotasService from "../../../services/notasService";

function VInformesDocenteAdministradorAuxiliar() {
  const [selectedNivel, setSelectedNivel] = useState("PRIMARIA");
  const [selectedGrado, setSelectedGrado] = useState("SELECCIONAR");
  const [selectedSeccion, setSelectedSeccion] = useState("A");
  const [selectedCurso, setSelectedCurso] = useState("SELECCIONAR");
  const [selectedCursoId, setSelectedCursoId] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [userDocente, setUserDocente] = useState({});
  const [selectedUnidad, setSelectedUnidad] = useState(1);
  const [notas, setNotas] = useState({});
  const optionsNivel = ["PRIMARIA", "SECUNDARIA"];

  //saber si es administrador
  const isAdmin = userDocente.rol === "ADMIN";
  console.log(isAdmin);

  const optionsGradoPrimaria = [
    { label: "SELECCIONAR", value: "SELECCIONAR" },
    { label: "1er Grado", value: 1 },
    { label: "2do Grado", value: 2 },
    { label: "3er Grado", value: 3 },
    { label: "4to Grado", value: 4 },
    { label: "5to Grado", value: 5 },
    { label: "6to Grado", value: 6 },
  ];
  const optionsGradoSecundaria = [
    { label: "SELECCIONAR", value: "SELECCIONAR" },
    { label: "1er Año", value: 1 },
    { label: "2do Año", value: 2 },
    { label: "3er Año", value: 3 },
    { label: "4to Año", value: 4 },
    { label: "5to Año", value: 5 },
  ];

  useEffect(() => {
    if (isAdmin) {
      // Caso administrador
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
    } else {
      // Caso no administrador
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
          .catch((error) =>
            console.error("Error al obtener los cursos:", error)
          );
      }
    }
  }, [isAdmin, selectedNivel]);

  useEffect(() => {
    async function cargarNotas() {
      try {
        const notasRegistradas = {};

        for (const alumno of alumnos) {
          const response =
            await NotasService.obtenerNotasPorAlumnoSubcursoYUnidad(
              alumno.usuarioId,
              selectedCursoId,
              selectedUnidad
            );
          const alumnoNotas = response.data.reduce((acc, nota) => {
            acc[nota.calificacionNumero - 1] = nota.calificacion;
            return acc;
          }, {});

          notasRegistradas[alumno.usuarioId] = alumnoNotas;
        }

        setNotas(notasRegistradas);
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    }

    cargarNotas();
  }, [alumnos, selectedCursoId, selectedUnidad]);

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
          console.log("Alumnos del curso y grado seleccionados:");
          setAlumnos(response.data);
        })
        .catch((error) =>
          console.error("Error al obtener los alumnos:", error)
        );
    } else {
      setAlumnos([]); // Reiniciar lista si no se ha seleccionado Grado o Curso
    }
  }, [selectedCursoId, selectedGrado]);

  //logica para cambiar el nivel segun el docente

  const docentePrimaria = userDocente.nivel === "PRIMARIA";

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

  let nivelP;
  isAdmin ? (nivelP = selectedNivel) : (nivelP = userDocente.nivel);
  console.log(nivelP);

  let infoAuxiliar = [
    nivelP,
    selectedGrado,
    selectedSeccion,
    selectedUnidad + " unidad",
  ];
  const competencias = ["C1", "C2", "C3", "C4"];

  return (
    <div className="VInformesDocenteAdministradorAuxiliarContainer">
      <div className="VInformesDocenteAdministradorAuxiliarTitleContainer">
        <h3>Auxiliar</h3>
      </div>
      <div
        className={
          isAdmin
            ? "SelectInformesDocenteAdministradorAuxiliarContainer admin"
            : "SelectInformesDocenteAdministradorAuxiliarContainer"
        }
      >
        {isAdmin ? (
          <SelectComponent
            name="Nivel"
            options={optionsNivel}
            value={selectedNivel}
            onChange={(e) => setSelectedNivel(e.target.value)}
          />
        ) : (
          <> </>
        )}
        <SelectComponent
          name="Grado"
          options={
            isAdmin
              ? selectedNivel === "PRIMARIA"
                ? optionsGradoPrimaria
                : optionsGradoSecundaria
              : docentePrimaria
              ? optionsGradoPrimaria
              : optionsGradoSecundaria
          }
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
        <SelectComponent
          name="Unidad"
          options={unidades}
          value={selectedUnidad}
          onChange={(e) => setSelectedUnidad(Number(e.target.value))}
        />
      </div>
      <div className="VInformesDocenteAdministradorAuxiliarContent">
        <CardInformeDocenteAdministrador
          info={infoAuxiliar}
          estudiantes={alumnos}
          notas={notas}
          competencias={competencias}
          nivel={nivelP}
          grado={selectedGrado}
          subcursoId={selectedCursoId}
          unidad={selectedUnidad}
          bimestral={false}
        />
      </div>
    </div>
  );
}

export default VInformesDocenteAdministradorAuxiliar;
