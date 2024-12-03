import React, { useState, useEffect } from "react";
import "./TablaSubirNotasDocenteAdministrador.css";
import ButtonSubmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import NotasService from "../../../../services/notasService";

function TablaSubirNotasDocenteAdministrador({
  alumnos,
  competencias,
  subcursoId,
  unidad,
  onUnidadCompleta,
}) {
  const [isSmall, setisSmall] = useState(window.innerWidth > 530);
  const [notas, setNotas] = useState({});
  const [competenciasSubidas, setCompetenciasSubidas] = useState({});
  const [competenciaActiva, setCompetenciaActiva] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [bloquearFormulario, setBloquearFormulario] = useState(false);

  
  useEffect(() => {
    
    const handleResize = () => {
      setisSmall(window.innerWidth > 530);
    };


    window.addEventListener("resize", handleResize);

    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);



  useEffect(() => {
    async function cargarNotas() {
      try {
        const notasRegistradas = {};
        const competenciasIniciales = {};

        for (const alumno of alumnos) {
          const response =
            await NotasService.obtenerNotasPorAlumnoSubcursoYUnidad(
              alumno.usuarioId,
              subcursoId,
              unidad
            );
          const alumnoNotas = response.data.reduce((acc, nota) => {
            acc[nota.calificacionNumero - 1] = nota.calificacion;
            return acc;
          }, {});

          let promedio = undefined;
          try {
            const promedioResponse = await NotasService.obtenerPromedioUnidad(
              alumno.usuarioId,
              subcursoId,
              unidad
            );

            promedio = promedioResponse.data || undefined;
          } catch (error) {
            console.error(
              `Error al obtener promedio para el alumno ${alumno.usuarioId}:`,
              error
            );
          }

          notasRegistradas[alumno.usuarioId] = {
            ...alumnoNotas,
            promedio,
          };

          // Determinar si las competencias están llenas para este alumno
          competenciasIniciales[alumno.usuarioId] = competencias.map(
            (_, index) => alumnoNotas[index] !== undefined
          );
        }

        setNotas(notasRegistradas);
        setCompetenciasSubidas(competenciasIniciales);

        // Contar competencias llenas para bloquear el formulario y ocultar el botón
        const competenciasLlenasCount = competencias.reduce(
          (count, _, index) => {
            return (
              count +
              (Object.values(notasRegistradas).every(
                (alumnoNotas) => alumnoNotas[index] !== undefined
              )
                ? 1
                : 0)
            );
          },
          0
        );

        // Bloquea el formulario si al menos dos competencias están llenas
        setBloquearFormulario(competenciasLlenasCount >= 1);

        // Actualiza la competencia activa dependiendo de si el formulario está bloqueado o no
        setCompetenciaActiva(
          competenciasLlenasCount >= 2 ? competencias.length : 0
        );
        setErrorMessage("");
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    }

    cargarNotas();
  }, [alumnos, subcursoId, unidad, competencias]);

  const handleNotaChange = (usuarioId, competenciaIndex, value) => {
    setNotas((prevNotas) => ({
      ...prevNotas,
      [usuarioId]: {
        ...prevNotas[usuarioId],
        [competenciaIndex]: value,
      },
    }));
  };

  const esCompetenciaVacia = (competenciaIndex) => {
    return alumnos.every(
      (alumno) =>
        notas[alumno.usuarioId]?.[competenciaIndex] === "" ||
        notas[alumno.usuarioId]?.[competenciaIndex] === undefined
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todasVacias = esCompetenciaVacia(competenciaActiva);

    if (!todasVacias) {
      const camposVacios = alumnos.some(
        (alumno) =>
          notas[alumno.usuarioId]?.[competenciaActiva] === undefined ||
          notas[alumno.usuarioId]?.[competenciaActiva] === ""
      );

      if (camposVacios) {
        setErrorMessage(
          `Complete todas las notas para C${
            competenciaActiva + 1
          } o ignore esta.`
        );
        return;
      }
    }

    setErrorMessage("");

    for (const alumno of alumnos) {
      const usuarioId = alumno.usuarioId;
      const calificacion = notas[usuarioId]?.[competenciaActiva];

      if (calificacion !== undefined && calificacion !== null) {
        try {
          await NotasService.registrarCalificacion(
            usuarioId,
            subcursoId,
            unidad,
            competenciaActiva + 1,
            calificacion
          );

          setCompetenciasSubidas((prev) => ({
            ...prev,
            [usuarioId]: {
              ...prev[usuarioId],
              [competenciaActiva]: true,
            },
          }));
        } catch (error) {
          console.error("Error al registrar la calificación:", error);
        }
      }
    }

    if (todasVacias) {
      setCompetenciasSubidas((prev) =>
        alumnos.reduce(
          (acc, alumno) => {
            acc[alumno.usuarioId] = {
              ...acc[alumno.usuarioId],
              [competenciaActiva]: true,
            };
            return acc;
          },
          { ...prev }
        )
      );
    }

    const nuevaCompetenciaActiva = competenciaActiva + 1;
    setCompetenciaActiva(
      nuevaCompetenciaActiva < competencias.length
        ? nuevaCompetenciaActiva
        : competencias.length
    );
    // Llama a onUnidadCompleta si todas las competencias están llenas

    if (competenciaActiva >= competencias.length - 1) {
      onUnidadCompleta();
    }
  };

  return (
    <div className="TablaNotasInputContainer">
      {alumnos.length === 0 ? (
        <div className="TablaNotasInputEmpty">
          <h3>No hay Alumnos registrados</h3>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <table className="TableInputNotas">
            <thead>
              <tr>
                <th>N°</th>
                <th>Apellidos</th>
                <th>Nombres</th>
                {competencias.map((_, index) => (
                  <th key={index}>C{index + 1}</th>
                ))}
                {bloquearFormulario ? <th>{isSmall?("Promedio"):("P")}</th> : <></>}
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) => (
                <tr key={alumno.usuarioId}>
                  <td>{index + 1}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.nombre}</td>
                  {competencias.map((_, compIndex) => (
                    <td key={compIndex} className="Tdcomp">
                      {competenciasSubidas[alumno.usuarioId]?.[compIndex] ||
                      bloquearFormulario ? (
                        <span>
                          {notas[alumno.usuarioId]?.[compIndex] !== undefined
                            ? notas[alumno.usuarioId][compIndex]
                            : "-"}
                        </span>
                      ) : (
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={notas[alumno.usuarioId]?.[compIndex] || ""}
                          onChange={(e) =>
                            handleNotaChange(
                              alumno.usuarioId,
                              compIndex,
                              e.target.value
                            )
                          }
                          disabled={
                            bloquearFormulario || compIndex > competenciaActiva
                          }
                        />
                      )}
                    </td>
                  ))}
                  {bloquearFormulario ? (
                    <td>
                      {notas[alumno.usuarioId]?.promedio !== undefined
                        ? Math.round(notas[alumno.usuarioId].promedio)
                        : "-"}
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="ButtonSubmitSubirNotasDocAdmContainer">
            {!bloquearFormulario && competenciaActiva < competencias.length && (
              <ButtonSubmit nombre={`Subir Notas C${competenciaActiva + 1}`} />
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default TablaSubirNotasDocenteAdministrador;
