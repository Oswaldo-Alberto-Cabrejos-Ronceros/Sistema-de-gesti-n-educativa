import React from 'react'
import './VTareasEstudiante.css'
import { Link,Routes,Route } from 'react-router-dom'
import PrimaryButton from '../generalsComponets/PrimaryButton/PrimaryButton'
import VTareasEstudiantePorCurso from './VTareasEstudiantePorCurso/VTareasEstudiantePorCurso'
import VTareasEstudiantePorFecha from './VTareasEstudiantePorFecha/VTareasEstudiantePorFecha'

function VTareasEstudiante() {
  const tareasCurso = [
    [
      {
        nombre: "Tarea: Angulos Trigonometricos 1",
        link: "https://www.youtube.com/",
        fechaEntrega: "12/05/2024",
      },
      {
        nombre: "Tarea: Angulos Trigonometricos 2",
        link: "https://www.youtube.com/",
        fechaEntrega: "12/05/2024",
      },
    ],
    [
      {
        nombre: "Tarea: Angulos Complementarios 1",
        link: "https://www.youtube.com/",
        fechaEntrega: "12/05/2024",
      },

      {
        nombre: "Tarea: Angulos Complementarios 2",
        link: "https://www.youtube.com/",
        fechaEntrega: "12/05/2024",
      },
    ],
    [
      {
        nombre: "Tarea: Angulos Suplementarios 1",
        link: "https://www.youtube.com/",
        fechaEntrega: "12/05/2024",
      },
      {
        nombre: "Tarea: Angulos Suplementarios 2",
        link: "https://www.youtube.com/",
        fechaEntrega: "12/05/2024",
      },
    ],
  ];

  let tareasPorFechas = [
    {
      nombre: "Tarea: Angulos Suplementarios 1",
      link: "https://www.youtube.com/",
      fechaEntrega: "12/05/2024",
    },
    {
      nombre: "Tarea: Angulos Suplementarios 2",
      link: "https://www.youtube.com/",
      fechaEntrega: "12/05/2024",
    },
    {
      nombre: "Tarea: Angulos Complementarios 1",
      link: "https://www.youtube.com/",
      fechaEntrega: "12/05/2024",
    },

    {
      nombre: "Tarea: Angulos Complementarios 2",
      link: "https://www.youtube.com/",
      fechaEntrega: "12/05/2024",
    },
  ];

  return (
    <div className='VTareasEstudianteContainer'>
          <div className="VTareasEstudianteDetalleTitle">
        <h3>Tareas</h3>
      </div>
      <div className="VTareasEstudianteButtonsContainer">
        <Link className="LinkVTareasEstCont" to="fecha" >
        <PrimaryButton nombre={"Por fecha"} />
        </Link>
        <Link className="LinkVTareasEstCont" to="curso">
        <PrimaryButton nombre={"Por curso"} />
        </Link>
      </div>
      <div className="VTareasEstudianteCamb">
      <Routes>
      <Route index element={<VTareasEstudiantePorFecha tareas={tareasPorFechas}/>}/>
      <Route path="fecha" element={<VTareasEstudiantePorFecha tareas={tareasPorFechas}/>}/>
      <Route path="curso" element={<VTareasEstudiantePorCurso tareas={tareasCurso}/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default VTareasEstudiante