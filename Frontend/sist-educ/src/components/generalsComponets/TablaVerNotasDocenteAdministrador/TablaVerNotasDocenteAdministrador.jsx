import React,{useState, useEffect} from "react";
import "./TablaVerNotasDocenteAdministrador.css";

function TablaVerNotasDocenteAdministrador({
  estudiantes,
  notas,
  competencias,
}) {
  const [isSmall, setisSmall] = useState(window.innerWidth > 524);

  useEffect(() => {
    
    const handleResize = () => {
      setisSmall(window.innerWidth > 524);
    };


    window.addEventListener("resize", handleResize);

    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="TablaNotasVerDocContainer">
      {estudiantes.length === 0 ? (
        <div className="TablaNotasVerDocEmpty">
          <h2>No hay notas registradas</h2>
        </div>
      ) : (
        <table className="TableVerDocNotas">
          <thead>
            <tr>
              <th>N°</th>
              <th>Apellidos</th>
              <th>Nombres</th>
              {competencias.map((_, index) => (
                <th key={index}>C{index + 1}</th>
              ))}
              <th>{isSmall?("Promedio"):("P")}</th>
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
                    {notas[estudiante.usuarioId]?.[compIndex] !== undefined
                      ? notas[estudiante.usuarioId][compIndex]
                      : "-"}
                  </td>
                ))}
                <td>   {notas[estudiante.usuarioId]?.promedio !== undefined
    ? Math.round(notas[estudiante.usuarioId].promedio) 
    : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TablaVerNotasDocenteAdministrador;
