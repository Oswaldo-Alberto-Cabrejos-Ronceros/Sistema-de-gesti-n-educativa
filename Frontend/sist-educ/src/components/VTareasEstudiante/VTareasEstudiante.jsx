import React from "react";
import "./VTareasEstudiante.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VTareasEstudiantePorCurso from "./VTareasEstudiantePorCurso/VTareasEstudiantePorCurso";
import VTareasEstudiantePorFecha from "./VTareasEstudiantePorFecha/VTareasEstudiantePorFecha";
import VVerTareaGeneral from "../VVerTareaGeneral/VVerTareaGeneral";

function VTareasEstudiante() {
  const tareasCurso = [
    [
      {
        nombre: "Tarea: Angulos Trigonometricos 1",
        link: "https://www.youtube.com/",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        fechaEntrega: "17/12/24",
      },
      {
        nombre: "Tarea: Angulos Trigonometricos 2",
        link: "https://www.youtube.com/",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        fechaEntrega: "17/12/24",
      },
    ],
    [
      {
        nombre: "Tarea: Angulos Complementarios 1",
        link: "https://www.youtube.com/",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        fechaEntrega: "17/12/24",
      },
      {
        nombre: "Tarea: Angulos Complementarios 2",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        link: "https://www.youtube.com/",
        fechaEntrega: "17/12/24",
      },
    ],
    [
      {
        nombre: "Tarea: Angulos Suplementarios 1",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        link: "https://www.youtube.com/",
        fechaEntrega: "17/12/24",
      },
      {
        nombre: "Tarea: Angulos Suplementarios 2",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        link: "https://www.youtube.com/",
        fechaEntrega: "17/12/24",
      },
    ],
  ];

  const tareasPorFecha = [
    {
      nombre: "Tarea: Angulos Trigonometricos 1",
      link: "https://www.youtube.com/",
      descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      fechaEntrega: "17/12/24",
    },
    {
      nombre: "Tarea: Angulos Trigonometricos 2",
      link: "https://www.youtube.com/",
      descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      fechaEntrega: "17/12/24",
    },

    {
      nombre: "Tarea: Angulos Complementarios 1",
      link: "https://www.youtube.com/",
      descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      fechaEntrega: "17/12/24",
    },
    {
      nombre: "Tarea: Angulos Complementarios 2",
      descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      link: "https://www.youtube.com/",
      fechaEntrega: "17/12/24",
    },
    {
      nombre: "Tarea: Angulos Suplementarios 1",
      descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      link: "https://www.youtube.com/",
      fechaEntrega: "17/12/24",
    },
    {
      nombre: "Tarea: Angulos Suplementarios 2",
      descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      link: "https://www.youtube.com/",
      fechaEntrega: "17/12/24",
    },
  ];

  return (
    <div className="VTareasEstudianteContainer">
      <div className="VTareasEstudianteDetalleTitle">
        <h3>Tareas</h3>
      </div>
      <div className="VTareasEstudianteButtonsContainer">
        <Link className="LinkVTareasEstCont" to="fecha">
          <PrimaryButton nombre={"Por fecha"} />
        </Link>
        <Link className="LinkVTareasEstCont" to="curso">
          <PrimaryButton nombre={"Por curso"} />
        </Link>
      </div>
      <div className="VTareasEstudianteCamb">
        <Routes>
          <Route
            index
            element={<Navigate to="fecha" replace state={{ tareasPorFecha }} />}
          />
          <Route path="fecha/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="fecha/*"
            element={
              <VTareasEstudiantePorFecha
                to={"descripcion"}
                tareasPorFecha={tareasPorFecha}
                tareas={tareasPorFecha}
              />
            }
          />
          <Route path="curso/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="curso/*"
            element={
              <VTareasEstudiantePorCurso
                to={"descripcion"}
                tareasCurso={tareasCurso}
                tareas={tareasCurso}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default VTareasEstudiante;
