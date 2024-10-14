import React from "react";
import './TablaVerDocente.css'

function TablaVerDocente({alumnosNotas}) {
  const indexAlumnos = alumnosNotas.length > 0 ? Object.keys(alumnosNotas[0]) : [];
  return (
    <div className="TablaNotasVerDocContainer">
        {
            indexAlumnos.length ===0?(
                <div className="TablaNotasVerDocEmpty">
                    <h2>No hay notas registradas</h2>
                </div>
            ) :(      <table className="TableVerDocNotas">
                <thead>
                  {indexAlumnos.map((item) => {
                    return <th>{item}</th>;
                  })}
                </thead>
                <tbody>
                  {alumnosNotas.map((item, index) => (
                    <tr key={index}>
                      {indexAlumnos.map((column) => (
                        <td key={`${index}-${column}`}> {item[column]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>)
        }

    </div>
  );
}

export default TablaVerDocente;
