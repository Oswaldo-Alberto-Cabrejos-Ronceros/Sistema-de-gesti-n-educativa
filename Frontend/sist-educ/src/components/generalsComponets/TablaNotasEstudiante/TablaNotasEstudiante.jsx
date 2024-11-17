import React, { useState, useEffect } from "react";
import subcursoService from "../../../services/subcursoService";
import NotasService from "../../../services/notasService";
import "./TablaNotasEstudiante.css";

function TablaNotasEstudiante({ tipo, indicador }) {
  const [cursos, setCursos] = useState([]);
  const [notas, setNotas] = useState([]);
  console.log(tipo);

  function obtenerUnidadesBimestre(bimestre) {
    const inicio = (bimestre - 1) * 2 + 1;
    return [inicio, inicio + 1];
  }

  if (tipo === "unidad") {
    useEffect(() => {
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
                        acc[`c${nota.calificacionNumero}`] = nota.calificacion;
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
                  promedio: Math.round(promedio.promedio),
                }))
              )
            ).then((notasArray) => {
              const notasFiltradas = notasArray.filter((nota) => nota !== null);
              setNotas(notasFiltradas);
              console.log("Notas por curso con promedio:", notasFiltradas); // Imprimir en consola
            });
          })
          .catch((error) =>
            console.error("Error al obtener los cursos:", error)
          );
      }
    }, [indicador]);
  } else if (tipo === "bimestre") {
    useEffect(() => {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      if (!userData) return;

      subcursoService
        .listarSubcursosPorUsuario(userData.usuarioId, userData.rol)
        .then((response) => {
          const cursosObtenidos = response.data.map((curso) => ({
            Nombre: curso.nombre,
            Nivel: curso.nivel,
            Id: curso.subcursoId,
          }));
          setCursos(cursosObtenidos);

          Promise.all(
            cursosObtenidos.map((curso) => {
              const unidades =
                tipo === "unidad"
                  ? [indicador]
                  : obtenerUnidadesBimestre(indicador);

              // Promesas para obtener notas por cada unidad
              const notasUnidadesPromises = unidades.map((unidad) =>
                Promise.all([
                  NotasService.obtenerNotasPorAlumnoSubcursoYUnidad(
                    userData.usuarioId,
                    curso.Id,
                    unidad
                  )
                    .then((response) => ({
                      unidad,
                      ...response.data.reduce((acc, nota) => {
                        acc[`c${nota.calificacionNumero}`] = nota.calificacion;
                        return acc;
                      }, {}),
                    }))
                    .catch(() => null),
                  NotasService.obtenerPromedioUnidad(
                    userData.usuarioId,
                    curso.Id,
                    unidad
                  )
                    .then((response) => ({ promedio: response.data }))
                    .catch(() => ({ promedio: "-" })),
                ]).then(([notasCurso, promedio]) => ({
                  ...notasCurso,
                  promedio: Math.round(promedio.promedio),
                }))
              );

              // Promesa para obtener el promedio bimestral
              const promedioBimestralPromise =
                tipo !== "unidad"
                  ? NotasService.obtenerPromedioBimestral(
                      userData.usuarioId,
                      curso.Id,
                      indicador
                    )
                      .then((response) => ({
                        promedioBimestral: response.data,
                      }))
                      .catch(() => ({ promedioBimestral: "-" }))
                  : Promise.resolve({ promedioBimestral: "-" });

              // Agrupar todas las promesas de notas y promedio bimestral
              return Promise.all([
                Promise.all(notasUnidadesPromises),
                promedioBimestralPromise,
              ]).then(([unidadesData, promedioBimestral]) => ({
                area: curso.Nombre,
                unidad1: unidadesData[0],
                unidad2: unidadesData[1],
                promedioBimestral: Math.round(
                  promedioBimestral.promedioBimestral
                ),
              }));
            })
          ).then((notasArray) => {
            setNotas(notasArray.filter((nota) => nota !== null));
          });
        })
        .catch((error) => console.error("Error al obtener los cursos:", error));
    }, [tipo, indicador]);
  } else {
    useEffect(() => {
      const userData = JSON.parse(sessionStorage.getItem("userData"));
      if (userData) {
        // Crear un arreglo para almacenar todas las promesas de obtención de notas por unidad
        const unidadesPromises = Array.from({ length: 8 }, (_, i) =>
          Promise.all([
            NotasService.obtenerNotasPorAlumnoSubcursoYUnidad(
              userData.usuarioId,
              indicador,
              i + 1
            )
              .then((response) => ({
                unidad: i + 1,
                ...response.data.reduce((acc, nota) => {
                  acc[`c${nota.calificacionNumero}`] = nota.calificacion;
                  return acc;
                }, {}),
              }))
              .catch(() => null),
            NotasService.obtenerPromedioUnidad(
              userData.usuarioId,
              indicador,
              i + 1
            )
              .then((response) => ({ promedio: response.data }))
              .catch(() => ({ promedio: "-" })),
          ]).then(([notasUnidad, promedioUnidad]) => ({
            ...notasUnidad,
            promedio: Math.round(promedioUnidad.promedio),
          }))
        );

        // Ejecutamos todas las promesas y variamos las notas con setNotas
        Promise.all(unidadesPromises)
          .then((unidadesData) => {
            const notasFiltradas = unidadesData.filter(
              (unidad) => unidad !== null
            );
            setNotas(notasFiltradas);
            console.log("Notas por unidad con promedio:", notasFiltradas);
          })
          .catch((error) => console.error("Error al obtener notas:", error));
      }
    }, [indicador]);
  }

  let unidades = obtenerUnidadesBimestre(indicador);
  console.log(notas);

  let noHayNotas;

  if (tipo === "unidad") {
    noHayNotas = notas.every((nota) => nota.promedio === 0);
  } else if (tipo === "bimestre") {
    noHayNotas = notas.every(
      (nota) => nota.unidad1.promedio === 0 && nota.unidad2.promedio === 0
    );
  } else {
    noHayNotas = notas.every((nota) => nota.promedio === 0);
  }
  console.log(noHayNotas);

  return (
    <div className="TablaNotasEstudianteContainer">
      {notas.length === 0 ? (
        <div className="TablaNotasEstudianteEmpty">
          <h3>Cargando...</h3>
        </div>
      ) : noHayNotas ? (
        <div className="TablaNotasEstudianteEmpty">
          <h3>No hay notas registradas</h3>
        </div>
      ) : tipo === "unidad" ? (
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
      ) : tipo === "bimestre" ? (
        <div>
          <table className="TableNotasEstudiante">
            <thead>
              <tr>
                <th>Unidad</th>
                <th colSpan="5">{"Unidad " + unidades[0]}</th>
                <th colSpan="5">{"Unidad " + unidades[1]}</th>
                <th>{"Bimestre " + indicador}</th>
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
                <th>C1</th>
                <th>C2</th>
                <th>C3</th>
                <th>C4</th>
                <th>Promedio</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, index) => (
                <tr key={index}>
                  <td>{nota.area}</td>
                  <td className="TdNota">{nota.unidad1?.c1 || "-"}</td>
                  <td className="TdNota">{nota.unidad1?.c2 || "-"}</td>
                  <td className="TdNota">{nota.unidad1?.c3 || "-"}</td>
                  <td className="TdNota">{nota.unidad1?.c4 || "-"}</td>
                  <td className="TdNota">{nota.unidad1?.promedio || "-"}</td>
                  <td className="TdNota">{nota.unidad2?.c1 || "-"}</td>
                  <td className="TdNota">{nota.unidad2?.c2 || "-"}</td>
                  <td className="TdNota">{nota.unidad2?.c3 || "-"}</td>
                  <td className="TdNota">{nota.unidad2?.c4 || "-"}</td>
                  <td className="TdNota">{nota.unidad2?.promedio || "-"}</td>
                  <td className="TdNota">{nota.promedioBimestral || "-"}</td>
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
                <th>Unidad</th>
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
                  <td className="TdNota">{nota.unidad}</td>
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
