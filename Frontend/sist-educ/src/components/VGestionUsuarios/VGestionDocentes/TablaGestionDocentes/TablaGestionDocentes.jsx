import React from 'react'
import './TablaGestionDocentes.css'
import PrimaryButton from '../../../generalsComponets/PrimaryButton/PrimaryButton';
import SelectComponent from '../../../generalsComponets/SelectComponent/SelectComponent';

function TablaGestionDocentes({docentes}) {
    let fEditarDocente = function () {
        alert("Presionando Boton Editar Docente");
      };
      let fEliminarDocente = function () {
        alert("Presionano Boton Eliminar Docente");
      };
  return (
    <div className='TablaGestionDocentesContainer'>
        {docentes.lenght===0?(
            <div className='TablaGestionDocentesVerDocEmpty'>
            <h3>No hay Docentes registrados</h3>
        </div>
        ): (
              <div>
                <table className='TableGestionDocentes'>
                    <thead>
                        <tr>
                        <th>Dni</th>
                        <th>Apellidos</th>
                        <th>Nombres</th>
                        <th>Celular</th>
                        <th>Correo</th>
                        <th>Nivel</th>
                        <th>Cursos</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        docentes.map((docente)=>(
                            <tr key={docente.Dni || index}>
                                <td>{docente.Dni}</td>
                                <td>{docente.Apellidos}</td>
                                <td>{docente.Nombres}</td>
                                <td>{docente.Celular}</td>
                                <td>{docente.Correo}</td>
                                <td>{docente.Nivel}</td>
                                <td>
                                    <SelectComponent name={"Cursos"} options={docente.Cursos} />
                                </td>
                                <td>
                                    <PrimaryButton onClick={fEditarDocente} nombre={"Editar"}/>
                                </td>
                                <td><PrimaryButton onClick={fEliminarDocente} nombre={"Eliminar"}/></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
              </div>
        )}

    </div>
  )
}

export default TablaGestionDocentes