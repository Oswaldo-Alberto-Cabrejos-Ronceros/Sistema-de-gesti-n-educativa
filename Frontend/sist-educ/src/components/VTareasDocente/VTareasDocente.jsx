import React from "react";
import "./VTareasDocente.css";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VTareasDocentePorCurso from "../VTareasDocente/VTareasDocentePorCurso/VTareasDocentePorCurso";
import VTareasDocentePorFecha from "../VTareasDocente/VTareasDocentePorFecha/VTareasDocentePorFecha";
import VVerTareaGeneral from "../VVerTareaGeneral/VVerTareaGeneral";

function VTareasDocente() {
  const tareas = [
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
  let tareasPorFecha = [
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
    <div className="VTareasDocenteContainer">
      <div className="VTareasDocenteTitle">
        <h3>Tareas</h3>
      </div>
      <div className="VTareasDocenteButtonsContainer">
        <Link className="LinkVTareasDocCont" to="fecha">
          <PrimaryButton nombre={"Por fecha"} />
        </Link>
        <Link className="LinkVTareasDocCont" to="curso">
          <PrimaryButton nombre={"Por curso"} />
        </Link>
      </div>
      <div className="VTareasDocenteCamb">
        <Routes>
          <Route
            index
            element={<Navigate to="fecha" replace state={{ tareasPorFecha }} />}
          />
          <Route path="fecha/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="fecha/*"
            element={
              <VTareasDocentePorFecha
                to={"descripcion"}
                tareasPorFecha={tareasPorFecha}
                tareas={tareasPorFecha}
              />
            }
          />
          <Route path="curso/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="curso"
            element={<VTareasDocentePorCurso 
              to={"descripcion"}
              tareasCurso={tareas}
              tareas={tareas} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default VTareasDocente;
