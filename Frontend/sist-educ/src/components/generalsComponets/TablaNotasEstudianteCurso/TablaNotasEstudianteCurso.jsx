import React from 'react'
import './TablaNotasEstudianteCurso.css'

function TablaNotasEstudianteCurso() {
  const notas=[];
  return (
    <div className='TablaNotasEstudianteCursoContainer'>
              {notas.length === 0 ? (
        <div className="TablaNotasEstudianteCursoEmpty">
          <h3>No hay Notas Registradas</h3>
        </div>
      ) : (
        <div>
          <table className="TableNotasCursoEstudiante">
            <thead>
              <tr>
                <th>Unidad</th>
                <th>C1</th>
                <th>C2</th>
                <th>C3</th>
                <th>C4</th>
                <th>C5</th>
                <th>Promedio</th>
              </tr>
            </thead>
            <tbody>
              {notas.map((nota, index) => (
                <tr key={index}>
                  <td>{nota.unidad}</td>
                  <td>{nota.c1}</td>
                  <td>{nota.c2}</td>
                  <td>{nota.c3}</td>
                  <td>{nota.c4}</td>
                  <td>{nota.c5}</td>
                  <td>{nota.promedio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default TablaNotasEstudianteCurso