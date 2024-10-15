import React from "react";
import "./TablaGestionEstudiantes.css";
import PrimaryButton from "../../../generalsComponets/PrimaryButton/PrimaryButton";

function TablaGestionEstudiantes({ estudiantes }) {
  let fEditar = function () {
    alert("Presionando Boton Editar");
  };
  let fEliminar = function () {
    alert("Presionano Boton Eliminar");
  };
  return (
    <div className="TablaGestionEstudiantesContainer">
      {estudiantes.length === 0 ? (
        <div className="TablaGestionEstudianteVerDocEmpty">
          <h3>No hay Alumnos registrados</h3>
        </div>
      ) : (
        <div>
          <table className="TableGestionEstudiante">
            <thead>
              <tr>
                <th>Dni</th>
                <th>Apellidos</th>
                <th>Nombres</th>
                <th>Celular</th>
                <th>Correo</th>
                <th>Nivel</th>
                <th>Grado</th>
                <th>Seccion</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante, index) => (
                <tr key={estudiante.Dni || index}>
                  <td>{estudiante.Dni}</td>
                  <td>{estudiante.Apellidos}</td>
                  <td>{estudiante.Nombres}</td>
                  <td>{estudiante.Celular}</td>
                  <td>{estudiante.Correo}</td>
                  <td>{estudiante.Nivel}</td>
                  <td>{estudiante.Grado}</td>
                  <td>{estudiante.Seccion}</td>
                  <td>
                    <PrimaryButton
                      onClick={() => fEditar(estudiante.id)}
                      nombre="Editar"
                    />
                  </td>
                  <td>
                    <PrimaryButton
                      onClick={() => fEliminar(estudiante.id)}
                      nombre="Eliminar"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TablaGestionEstudiantes;
