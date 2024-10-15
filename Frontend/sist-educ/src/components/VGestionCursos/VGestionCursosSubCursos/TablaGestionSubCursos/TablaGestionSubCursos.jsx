import React from 'react'
import './TablaGestionSubCursos.css'
import PrimaryButton from '../../../generalsComponets/PrimaryButton/PrimaryButton';

function TablaGestionSubCursos({subcursos}) {
    let fEditarSubCurso = function () {
        alert("Presionando Boton Editar SubCurso");
      };
  return (
    <div className='TablaGestionSubCursosContainer'>
{subcursos.lenght === 0 ? (
        <div className="TablaGestionSubCursosVerDocEmpty">
          <h3>No hay Subcursos registrados</h3>
        </div>
      ) : (
        <div>
          <table className="TableGestionSubCursos">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Curso</th>
                <th>Descripción</th>
                <th>Docente</th>
                <th>Modificar</th>
              </tr>
              </thead>
              <tbody>
                {subcursos.map((subcurso, index) => (
                  <tr key={index}>
                    <td>{subcurso.Nombre}</td>
                    <td>{subcurso.Curso}</td>
                    <td>{subcurso.Descripcion}</td>
                    <td>{subcurso.Docente}</td>
                    <td>
                      <PrimaryButton nombre={"Editar"} onClick={fEditarSubCurso} />
                    </td>
                  </tr>
                ))}
              </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TablaGestionSubCursos