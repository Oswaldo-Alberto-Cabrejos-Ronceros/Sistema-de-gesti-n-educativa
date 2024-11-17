import React from "react";
import "./TablaVerNotasDocenteAdministradorBimestral.css";

function TablaVerNotasDocenteAdministradorBimestral({
  estudiantes,
  notas,
  competencias,
  bimestre,
}) {
  function obtenerUnidadesBimestre(bimestre) {
    const inicio = (bimestre - 1) * 2 + 1;
    return [inicio, inicio + 1];
  }

  let unidades = obtenerUnidadesBimestre(bimestre);

  console.log(estudiantes);
  console.log(notas);
  console.log(unidades);
  return (
    <div className="TablaVerNotasDocenteAdministradorBimestralContainer">
      {estudiantes.length === 0 ? (
        <div className="TablaNotasVerDocEmpty">
          <h2>No hay notas registradas</h2>
        </div>
      ) : (
        <table className="TableVerDocNotasBimestral">
          <thead>
            <th colSpan="3">Unidad</th>
            <th colSpan="5">{"Unidad " + unidades[0]}</th>
            <th colSpan="5">{"Unidad " + unidades[1]}</th>
            <th>{"Bimestre " + bimestre}</th>
          </thead>
          <thead>
            <tr>
              <th>N°</th>
              <th>Apellidos</th>
              <th>Nombres</th>
              {competencias.map((_, index) => (
                <th key={index}>C{index + 1}</th>
              ))}
              <th>Promedio</th>
              {competencias.map((_, index) => (
                <th key={index}>C{index + 1}</th>
              ))}
              <th>Promedio</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            {estudiantes.map((estudiante, index) => (
              <tr key={estudiante.usuarioId}>
                <td className="TdCenter">{index + 1}</td>
                <td>{estudiante.apellido}</td>
                <td>{estudiante.nombre}</td>
                {competencias.map((_, compIndex) => (
                  <td  className="TdCenter" key={compIndex}>
                    {notas[estudiante.usuarioId]?.unidad1[compIndex] !==
                    undefined
                      ? notas[estudiante.usuarioId].unidad1[compIndex]
                      : "-"}
                  </td>
                ))}
                <td className="TdCenter">
                  {" "}
                  {notas[estudiante.usuarioId]?.unidad1 !== undefined
                    ? notas[estudiante.usuarioId].unidad1.promedio
                    : "-"}
                </td>
                {competencias.map((_, compIndex) => (
                  <td  className="TdCenter" key={compIndex}>
                    {notas[estudiante.usuarioId]?.unidad2[compIndex] !==
                    undefined
                      ? notas[estudiante.usuarioId].unidad2[compIndex]
                      : "-"}
                  </td>
                ))}
                <td className="TdCenter">
                  {notas[estudiante.usuarioId]?.unidad1 !== undefined
                    ? notas[estudiante.usuarioId].unidad2.promedio
                    : "-"}
                </td>
                <td className="TdCenter">
                  {notas[estudiante.usuarioId]?.promedioBimestre !== undefined
                    ? notas[estudiante.usuarioId].promedioBimestre
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablaVerNotasDocenteAdministradorBimestral;
