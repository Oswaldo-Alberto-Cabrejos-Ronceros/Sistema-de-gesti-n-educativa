import React from "react";
import "./TablaNotasEstudiante.css";

function TablaNotasEstudiante({ notas }) {
  return (
    <div className="TablaNotasEstudianteContainer">
      {notas.length === 0 ? (
        <div className="TablaNotasEstudianteEmpty">
          <h3>No hay Notas Registradas</h3>
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
                <th>C5</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, index) => (
                <tr key={index}>
                  <td>{nota.area}</td>
                  <td>{nota.c1}</td>
                  <td>{nota.c2}</td>
                  <td>{nota.c3}</td>
                  <td>{nota.c4}</td>
                  <td>{nota.c5}</td>
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
