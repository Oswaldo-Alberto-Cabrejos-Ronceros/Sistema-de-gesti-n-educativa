import React, { useState, useEffect } from "react";
import "./TablaVerNotasDocenteAdministradorBimestral.css";

function TablaVerNotasDocenteAdministradorBimestral({
  estudiantes,
  notas,
  competencias,
  bimestre,
}) {
  const [isSmall, setisSmall] = useState(window.innerWidth < 872);
  const [isVerySmall, setIsVerySmall] = useState(window.innerWidth < 696);

  useEffect(() => {
    const handleResize = () => {
      setisSmall(window.innerWidth < 872);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsVerySmall(window.innerWidth < 696);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function obtenerUnidadesBimestre(bimestre) {
    const inicio = (bimestre - 1) * 2 + 1;
    return [inicio, inicio + 1];
  }

  let unidades = obtenerUnidadesBimestre(bimestre);

  return (
    <div className="TablaVerNotasDocenteAdministradorBimestralContainer">
      {estudiantes.length === 0 ? (
        <div className="TablaNotasVerDocEmpty">
          <h2>No hay notas registradas</h2>
        </div>
      ) : isVerySmall ? (
        <>
          <table className="TableVerDocNotasBimestral">
            <thead>
              <tr>
                <th colSpan="3">Unidad</th>
                <th colSpan="5">{"Unidad " + unidades[0]}</th>
              </tr>
              <tr>
                <th>N°</th>
                <th>Apellidos</th>
                <th>Nombres</th>
                {competencias.map((_, index) => (
                  <th key={index}>C{index + 1}</th>
                ))}
                <th>P</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante, index) => (
                <tr key={estudiante.usuarioId}>
                  <td className="TdCenter">{index + 1}</td>
                  <td>{estudiante.apellido}</td>
                  <td>{estudiante.nombre}</td>
                  {competencias.map((_, compIndex) => (
                    <td className="TdCenter" key={compIndex}>
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
                </tr>
              ))}
            </tbody>
          </table>
          <table className="TableVerDocNotasBimestral">
            <thead>
              <tr>
                <th colSpan="5">{"Unidad " + unidades[1]}</th>
                <th>{"B" + bimestre}</th>
              </tr>
              <tr>
                {competencias.map((_, index) => (
                  <th key={index}>C{index + 1}</th>
                ))}
                <th>P</th>
                <th>P</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante, index) => (
                <tr>
                  {competencias.map((_, compIndex) => (
                    <td className="TdCenter" key={compIndex}>
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
        </>
      ) : (
        <table className="TableVerDocNotasBimestral">
          <thead>
            <tr>
              {" "}
              <th colSpan="3">Unidad</th>
              <th colSpan="5">{"Unidad " + unidades[0]}</th>
              <th colSpan="5">{"Unidad " + unidades[1]}</th>
              <th>{isSmall ? "B " + bimestre : "Bimestre " + bimestre}</th>
            </tr>

            <tr>
              <th>N°</th>
              <th>Apellidos</th>
              <th>Nombres</th>
              {competencias.map((_, index) => (
                <th key={index}>C{index + 1}</th>
              ))}
              <th>{isSmall ? "P" : "Promedio"}</th>
              {competencias.map((_, index) => (
                <th key={index}>C{index + 1}</th>
              ))}
              <th>{isSmall ? "P" : "Promedio"}</th>
              <th>{isSmall ? "P" : "Promedio"}</th>
            </tr>
          </thead>
          <thead></thead>
          <tbody>
            {estudiantes.map((estudiante, index) => (
              <tr key={estudiante.usuarioId}>
                <td className="TdCenter">{index + 1}</td>
                <td>{estudiante.apellido}</td>
                <td>{estudiante.nombre}</td>
                {competencias.map((_, compIndex) => (
                  <td className="TdCenter" key={compIndex}>
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
                  <td className="TdCenter" key={compIndex}>
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
