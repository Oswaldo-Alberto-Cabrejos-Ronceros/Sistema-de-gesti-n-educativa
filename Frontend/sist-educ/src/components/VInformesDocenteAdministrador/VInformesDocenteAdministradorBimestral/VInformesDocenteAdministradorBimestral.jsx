import React, { useEffect, useState } from "react";
import "./VInformesDocenteAdministradorBimestral.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardInformeDocenteAdministrador from "../../generalsComponets/CardInformeDocenteAdministrador/CardInformeDocenteAdministrador";
import subcursoService from "../../../services/subcursoService";
import AlumnoService from "../../../services/alumnoService";
import NotasService from "../../../services/notasService";

function VInformesDocenteAdministradorBimestral() {
  const [selectedNivel, setSelectedNivel] = useState("PRIMARIA");
  const [selectedGrado, setSelectedGrado] = useState("Seleccionar");
  const [selectedSeccion, setSelectedSeccion] = useState("A");
  const [selectedCurso, setSelectedCurso] = useState("Seleccionar");
  const [selectedCursoId, setSelectedCursoId] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [userDocente, setUserDocente] = useState({});
  const [selectedBimestre, setselectedBimestre] = useState(1);
  const [notas, setNotas] = useState({});
  const optionsNivel = [                { value: "PRIMARIA", label: "Primaria" },
    { value: "SECUNDARIA", label: "Secundaria" },];

  //saber si es administrador
  const isAdmin = userDocente.rol === "ADMIN";

  //funcion obtener unidades de un bimestre

  function obtenerUnidadesBimestre(bimestre) {
    const inicio = (bimestre - 1) * 2 + 1;
    return [inicio, inicio + 1];
  }

  const optionsGradoPrimaria = [
    { label: "Seleccionar", value: "Seleccionar" },
    { label: "1er Grado", value: 1 },
    { label: "2do Grado", value: 2 },
    { label: "3er Grado", value: 3 },
    { label: "4to Grado", value: 4 },
    { label: "5to Grado", value: 5 },
    { label: "6to Grado", value: 6 },
  ];
  const optionsGradoSecundaria = [
    { label: "Seleccionar", value: "Seleccionar" },
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
    async function cargarNotasBimestre() {
      try {
        const unidades = obtenerUnidadesBimestre(selectedBimestre);
        const notasRegistradas = {};

        for (const alumno of alumnos) {
          // Obtener notas para cada unidad en el bimestre
          const notasUnidad1 =
            await NotasService.obtenerNotasPorAlumnoSubcursoYUnidad(
              alumno.usuarioId,
              selectedCursoId,
              unidades[0] // Primera unidad del bimestre
            );

          const promedioUnidad1 = await NotasService.obtenerPromedioUnidad(
            alumno.usuarioId,
            selectedCursoId,
            unidades[0]
          );
          const notasUnidad2 =
            await NotasService.obtenerNotasPorAlumnoSubcursoYUnidad(
              alumno.usuarioId,
              selectedCursoId,
              unidades[1] // Segunda unidad del bimestre
            );

          const promedioUnidad2 = await NotasService.obtenerPromedioUnidad(
            alumno.usuarioId,
            selectedCursoId,
            unidades[1]
          );

          // Procesar las notas para cada unidad
          const alumnoNotasUnidad1 = notasUnidad1.data.reduce((acc, nota) => {
            acc[nota.calificacionNumero - 1] = nota.calificacion;
            return acc;
          }, {});

          alumnoNotasUnidad1.promedio = Math.round(promedioUnidad1.data);

          const alumnoNotasUnidad2 = notasUnidad2.data.reduce((acc, nota) => {
            acc[nota.calificacionNumero - 1] = nota.calificacion;
            return acc;
          }, {});
          alumnoNotasUnidad2.promedio = Math.round(promedioUnidad2.data);

          // Obtener el promedio del bimestre directamente desde el servicio
          const promedioResponse = await NotasService.obtenerPromedioBimestral(
            alumno.usuarioId,
            selectedCursoId,
            selectedBimestre
          );
          const promedioBimestre = Math.round(promedioResponse.data);

          // Agregar notas y promedio al objeto de notas registradas
          notasRegistradas[alumno.usuarioId] = {
            unidad1: alumnoNotasUnidad1,
            unidad2: alumnoNotasUnidad2,
            promedioBimestre,
          };
        }

        setNotas(notasRegistradas);
      } catch (error) {
        console.error("Error al cargar notas del bimestre:", error);
      }
    }

    cargarNotasBimestre();
  }, [alumnos, selectedCursoId, selectedBimestre]);

  // Maneja el cambio del select de Curso y actualiza selectedCursoId
  const handleCursoChange = (e) => {
    const selectedOption = cursos.find(
      (curso) => curso.nombre === e.target.value
    );
    setSelectedCurso(e.target.value);
    setSelectedCursoId(selectedOption ? selectedOption.subcursoId : null);
  };

  useEffect(() => {
    if (selectedCursoId && selectedGrado !== "Seleccionar") {
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

  //logica para cambiar el nivel segun el docente

  const docentePrimaria = userDocente.nivel === "PRIMARIA";

  const bimestres = [
    { label: "Bimestre 1", value: 1 },
    { label: "Bimestre 2", value: 2 },
    { label: "Bimestre 3", value: 3 },
    { label: "Bimestre 4", value: 4 },
  ];

  const nivelP=isAdmin ? (selectedNivel) : (userDocente.nivel);

  const CapitalizeNivel=nivelP==="PRIMARIA"?("Primaria"):("Secundaria")

  let infoBimestral = [
    CapitalizeNivel,
    selectedGrado,
    selectedSeccion,
    selectedBimestre + " bimestre",
  ];
  const competencias = ["C1", "C2", "C3", "C4"];

  return (
    <div className="VInformesDocenteAdministradorBimestralContainer">
      <div className="VInformesDocenteAdministradorBimestralTitleContainer">
        <h3>Bimestral</h3>
      </div>
      <div
        className={
          isAdmin
            ? "SelectInformesDocenteAdministradorBimestralContainer admin"
            : "SelectInformesDocenteAdministradorBimestralContainer"
        }
      >
        {isAdmin ? (
          <div className="FilterGroup">
            <label htmlFor="Nivel">Nivel:</label>

            <SelectComponent
              name="Nivel"
              options={optionsNivel}
              value={selectedNivel}
              onChange={(e) => setSelectedNivel(e.target.value)}
            />
          </div>
        ) : (
          <> </>
        )}

        <div className="FilterGroup">
          <label htmlFor="Grado">Grado:</label>

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
          options={[{ label: "Seleccionar Curso", value: "Seleccionar" }, ...cursos.map((curso) => curso.nombre)]}
          value={selectedCurso}
          onChange={handleCursoChange}
        />
          </div>

          <div className="FilterGroup">
            <label htmlFor="Bimestre">Bimestre:</label>

            <SelectComponent
          name="Bimestre"
          options={bimestres}
          value={selectedBimestre}
          onChange={(e) => setselectedBimestre(Number(e.target.value))}
        />
          </div>




      </div>
      <div className="VInformesDocenteAdministradorBimestralContent">
        <CardInformeDocenteAdministrador
          info={infoBimestral}
          estudiantes={alumnos}
          notas={notas}
          competencias={competencias}
          nivel={nivelP}
          grado={selectedGrado}
          subcursoId={selectedCursoId}
          bimestre={selectedBimestre}
          bimestral={true}
        />
      </div>
    </div>
  );
}

export default VInformesDocenteAdministradorBimestral;
