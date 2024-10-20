import React from 'react'
import './VTareasDocente.css'
import { Link,Routes,Route } from 'react-router-dom'
import PrimaryButton from '../generalsComponets/PrimaryButton/PrimaryButton'
import VTareasDocentePorCurso from '../VTareasDocente/VTareasDocentePorCurso/VTareasDocentePorCurso'
import VTareasDocentePorFecha from '../VTareasDocente/VTareasDocentePorFecha/VTareasDocentePorFecha'

function VTareasDocente() {
    
    const tareas = [
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
          { nombre: "Tarea: Angulos Complementarios 1", link: "https://www.youtube.com/",fechaEntrega: "12/05/2024", },
          
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
    <div className='VTareasDocenteContainer'>
              <div className="VTareasDocenteTitle">
        <h3>Tareas</h3>
      </div>
      <div className="VTareasDocenteButtonsContainer">
        <Link className="LinkVTareasDocCont" to="fecha" >
        <PrimaryButton nombre={"Por fecha"} />
        </Link>
        <Link className="LinkVTareasDocCont" to="curso">
        <PrimaryButton nombre={"Por curso"} />
        </Link>
      </div>
      <div className="VTareasDocenteCamb">
      <Routes>
      <Route index element={<VTareasDocentePorFecha tareas={tareasPorFechas}/>}/>
      <Route path="fecha" element={<VTareasDocentePorFecha tareas={tareasPorFechas}/>}/>
      <Route path="curso" element={<VTareasDocentePorCurso tareas={tareas}/>}/>
      </Routes>
      </div>
    </div>
  )
}

export default VTareasDocente