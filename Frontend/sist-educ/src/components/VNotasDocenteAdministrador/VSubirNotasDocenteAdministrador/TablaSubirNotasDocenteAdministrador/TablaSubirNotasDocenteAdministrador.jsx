import React, {useState, useEffect } from "react";
import './TablaSubirNotasDocenteAdministrador.css'
import ButtonSubmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";
import NotasService from "../../../../services/notasService"

function TablaSubirNotasDocenteAdministrador({ alumnos, competencias, subcursoId, unidad }) {
  const [notas, setNotas] = useState({});
  const [competenciasSubidas, setCompetenciasSubidas] = useState({});
  const [competenciaActiva, setCompetenciaActiva] = useState(0);

  // Carga inicial de las notas guardadas desde la base de datos
  useEffect(() => {
    async function cargarNotas() {
      try {
        const notasRegistradas = {};
        const competenciasIniciales = {};

        // Cargar notas de cada alumno
        for (const alumno of alumnos) {
          const response = await NotasService.obtenerNotasPorAlumnoSubcursoYUnidad(
            alumno.usuarioId,
            subcursoId,
            unidad
          );
          const alumnoNotas = response.data.reduce((acc, nota) => {
            acc[nota.calificacionNumero - 1] = nota.calificacion; // Guardar cada nota por índice
            return acc;
          }, {});

          notasRegistradas[alumno.usuarioId] = alumnoNotas;

          // Marcar competencias ya subidas para el alumno
          competenciasIniciales[alumno.usuarioId] = competencias.map((_, index) => !!alumnoNotas[index]);
        }

        setNotas(notasRegistradas);
        setCompetenciasSubidas(competenciasIniciales);
      } catch (error) {
        console.error("Error al cargar notas:", error);
      }
    }

    cargarNotas();
  }, [alumnos, subcursoId, unidad, competencias]);

  // Maneja el cambio en los inputs de calificaciones
  const handleNotaChange = (usuarioId, competenciaIndex, value) => {
    setNotas((prevNotas) => ({
      ...prevNotas,
      [usuarioId]: {
        ...prevNotas[usuarioId],
        [competenciaIndex]: value,
      },
    }));
  };

  // Envía las notas al servidor
  const handleSubmit = async (e) => {
    e.preventDefault();

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

          // Bloquear la competencia subida
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

    // Mover a la siguiente competencia después de subir
    setCompetenciaActiva((prev) => (prev + 1 < competencias.length ? prev + 1 : prev));
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
                <th>DNI</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                {competencias.map((_, index) => (
                  <th key={index}>C{index + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno, index) => (
                <tr key={alumno.usuarioId}>
                  <td>{index + 1}</td>
                  <td>{alumno.dni}</td>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  {competencias.map((_, compIndex) => (
                    <td key={compIndex} className="Tdcomp">
                      <input
                        type="number"
                        min={0}
                        max={20}
                        value={notas[alumno.usuarioId]?.[compIndex] || ""}
                        onChange={(e) =>
                          handleNotaChange(alumno.usuarioId, compIndex, e.target.value)
                        }
                        disabled={
                          competenciasSubidas[alumno.usuarioId]?.[compIndex] || compIndex > competenciaActiva
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ButtonSubmitSubirNotasDocAdmContainer">
            <ButtonSubmit nombre={`Subir Notas C${competenciaActiva + 1}`} />
          </div>
        </form>
      )}
    </div>
  );
}

export default TablaSubirNotasDocenteAdministrador;
