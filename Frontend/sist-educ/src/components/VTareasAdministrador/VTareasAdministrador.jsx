import React from "react";
import "./VTareasAdministrador.css";
import { Link,Routes,Route } from 'react-router-dom'
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VTareasAdministradorPorCurso from '../VTareasAdministrador/VTareasAdministradorPorCurso/VTareasAdministradorPorCurso'
import VTareasAdminsitradorPorFecha from '../VTareasAdministrador/VTareasAdministradorPorFecha/VTareasAdministradorPorFecha'

function VTareasAdministrador() {
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
    <div className="VTareasAdministradorContainer">
      <div className="VTareasAdministradorTitle">
        <h3>Tareas</h3>
      </div>
      <div className="VTareasAdministradorButtonsContainer">
        <Link className="LinkVTareasAdministrador" to="fecha" >
        <PrimaryButton nombre={"Por fecha"} />
        </Link>
        <Link className="LinkVTareasAdministrador" to="curso">
        <PrimaryButton nombre={"Por curso"} />
        </Link>
      </div>
      <div className="VTareasAdministradorCamb">
      <Routes>
      <Route index element={<VTareasAdminsitradorPorFecha tareas={tareasPorFechas}/>}/>
      <Route path="fecha" element={<VTareasAdminsitradorPorFecha tareas={tareasPorFechas}/>}/>
      <Route path="curso" element={<VTareasAdministradorPorCurso tareas={tareas}/>}/>
      </Routes>
      </div>
    </div>
  );
}

export default VTareasAdministrador;
