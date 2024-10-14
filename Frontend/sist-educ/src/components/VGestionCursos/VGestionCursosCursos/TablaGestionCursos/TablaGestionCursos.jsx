import React from "react";
import "./TablaGestionCursos.css";
import SelectComponent from "../../../generalsComponets/SelectComponent/SelectComponent";
import PrimaryButton from "../../../generalsComponets/PrimaryButton/PrimaryButton";

function TablaGestionCursos({cursos}) {
  let fEditarCurso = function () {
    alert("Presionando Boton Editar Curso");
  };
  return (
    <div className="TablaGestionCursosContainer">
      {cursos.lenght === 0 ? (
        <div className="TablaGestionCursosVerDocEmpty">
          <h3>No hay Cursos registrados</h3>
        </div>
      ) : (
        <div>
          <table className="TableGestionCursos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Nivel</th>
                <th>Subcursos</th>
                <th>Modificar</th>
              </tr>
              </thead>
              <tbody>
                {cursos.map((curso, index) => (
                  <tr key={index}>
                    <td>{curso.Nombre}</td>
                    <td>{curso.Descripcion}</td>
                    <td>{curso.Nivel}</td>
                    <td>
                      <SelectComponent options={curso.Subcursos} />
                    </td>
                    <td>
                      <PrimaryButton nombre={"Editar"} onClick={fEditarCurso} />
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

export default TablaGestionCursos;
