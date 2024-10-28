import React from 'react'
import './TablaGestionDocentes.css'
import PrimaryButton from '../../../generalsComponets/PrimaryButton/PrimaryButton';
import SelectComponent from '../../../generalsComponets/SelectComponent/SelectComponent';

function TablaGestionDocentes({docentes}) {
    let cursos=["Matematica","Comunicacion"];
    console.log(docentes)
  return (
    <div className='TablaGestionDocentesContainer'>
        {docentes.lenght === 0 ? (
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
                        <th>Codigo</th>
                        <th>Nivel</th>
                        <th>Cursos</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        docentes.map((docente)=>(
                            <tr key={docente.dni}>
                                <td>{docente.dni}</td>
                                <td>{docente.apellido}</td>
                                <td>{docente.nombre}</td>
                                <td>{docente.telefono}</td>
                                <td>{docente.codigo}</td>
                                <td>{docente.nivel}</td>
                                <td>
                                    <SelectComponent name={"Cursos"} options={cursos} />
                                </td>
                                <td>
                                    <PrimaryButton nombre={"Editar"}/>
                                </td>
                                <td><PrimaryButton nombre={"Eliminar"}/></td>
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