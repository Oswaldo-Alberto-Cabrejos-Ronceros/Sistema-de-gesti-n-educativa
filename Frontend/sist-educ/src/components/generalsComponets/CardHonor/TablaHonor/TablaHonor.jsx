import React from "react";
import "./TablaHonor.css";

function TablaHonor({estudiantesHonor}) {
  return (
    <div className="TablaHonorContainer">
      {estudiantesHonor.length === 0 ? (
        <div className="TablaHonorEmpty">
          <h3>No hay Notas registradas</h3>
        </div>
      ) : (
        <div>
            <table className="TableHonor">
                <thead>
                    <tr>
                        <th>Mérito</th>
                        <th>Apellidos</th>
                        <th>Nombres</th>
                        <th>Promedio</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantesHonor.map((estudiante, index)=>(
                        <tr key={estudiante.Merito || index}>
                            <td>{index+1}</td>
                            <td>{estudiante.alumno.nombre}</td>
                            <td>{estudiante.alumno.apellido}</td>
                            <td>{parseInt(estudiante.promedio)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}

export default TablaHonor;
