import React, { useState, useEffect } from "react";
import subcursoService from "../../../services/subcursoService";
import NotasService from "../../../services/notasService";
import "./TablaNotasEstudiante.css";

function TablaNotasEstudiante({ tipo, indicador }) {
  const [cursos, setCursos] = useState([]);
  const [notas, setNotas] = useState([]);
  console.log(tipo);

  tipo === "unidad"
    ? useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        if (userData) {
          subcursoService
            .listarSubcursosPorUsuario(userData.usuarioId, userData.rol)
            .then((response) => {
              const cursosObtenidos = response.data.map((curso) => ({
                Nombre: curso.nombre,
                Nivel: curso.nivel,
                Id: curso.subcursoId,
              }));
              setCursos(cursosObtenidos);

              // Obtener las notas y el promedio para cada curso
              Promise.all(
                cursosObtenidos.map((curso) =>
                  Promise.all([
                    NotasService.obtenerNotasPorAlumnoSubcursoYUnidad(
                      userData.usuarioId,
                      curso.Id,
                      indicador
                    )
                      .then((response) => ({
                        area: curso.Nombre,
                        ...response.data.reduce((acc, nota) => {
                          acc[`c${nota.calificacionNumero}`] =
                            nota.calificacion;
                          return acc;
                        }, {}),
                      }))
                      .catch((error) => {
                        console.error(
                          `Error al obtener notas para el curso ${curso.Id}:`,
                          error
                        );
                        return null;
                      }),
                    NotasService.obtenerPromedioUnidad(
                      userData.usuarioId,
                      curso.Id,
                      indicador
                    )
                      .then((response) => ({ promedio: response.data }))
                      .catch((error) => {
                        console.error(
                          `Error al obtener el promedio para el curso ${curso.Id}:`,
                          error
                        );
                        return { promedio: "-" };
                      }),
                  ]).then(([notasCurso, promedio]) => ({
                    ...notasCurso,
                    promedio: parseInt(promedio.promedio),
                  }))
                )
              ).then((notasArray) => {
                const notasFiltradas = notasArray.filter(
                  (nota) => nota !== null
                );
                setNotas(notasFiltradas);
                console.log("Notas por curso con promedio:", notasFiltradas); // Imprimir en consola
              });
            })
            .catch((error) =>
              console.error("Error al obtener los cursos:", error)
            );
        }
      }, [indicador])
    : console.log("Bimestral");

  return (
    <div className="TablaNotasEstudianteContainer">
      {notas.length === 0 ? (
        <div className="TablaNotasEstudianteEmpty">
          <h3>No hay Notas Registradas</h3>
        </div>
      ) : tipo === "unidad" ? (
        <div>
          <table className="TableNotasEstudiante">
            <thead>
              <tr>
                <th>
                  Bimestre
                </th>
                <th>Bimestre 1</th>
                <th>Bimestre 2</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Área</th>
                <th>C1</th>
                <th>C2</th>
                <th>C3</th>
                <th>C4</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, index) => (
                <tr key={index}>
                  <td>{nota.area}</td>
                  <td className="TdNota">{nota.c1 || "-"}</td>
                  <td className="TdNota">{nota.c2 || "-"}</td>
                  <td className="TdNota">{nota.c3 || "-"}</td>
                  <td className="TdNota">{nota.c4 || "-"}</td>
                  <td className="TdNota">{nota.promedio || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <table className="TableNotasEstudiante">
            <thead>
              <tr>
                <th>Área</th>
                <th>C1</th>
                <th>C2</th>
                <th>C3</th>
                <th>C4</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, index) => (
                <tr key={index}>
                  <td>{nota.area}</td>
                  <td className="TdNota">{nota.c1 || "-"}</td>
                  <td className="TdNota">{nota.c2 || "-"}</td>
                  <td className="TdNota">{nota.c3 || "-"}</td>
                  <td className="TdNota">{nota.c4 || "-"}</td>
                  <td className="TdNota">{nota.promedio || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TablaNotasEstudiante;
