import React from "react";
import "./VCursoDocenteAdministradorContenido.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import { useLocation } from "react-router-dom";
import { Routes, Route, Link, Navigate} from "react-router-dom";
import VCursoDocenteContenidoContenido from "./VCursoDocenteAdministradorContenidoContenido/VCursosDocenteAdministradorContenidoContenido";
import VCursoDocenteContenidoTareas from "./VCursoDocenteAdministradorContenidoTareas/VCursoDocenteAdministradorContenidoTareas";
import VVerContenidoGeneral from "../VVerContenidoGeneral/VVerContenidoGeneral";
import VVerTareaGeneral from "../VVerTareaGeneral/VVerTareaGeneral";

function VCursoDocenteAdministradorContenido() {
  const location = useLocation();
  let { curso } = location.state || {};
  if (curso === undefined) {
    curso = location.state.curso;
  }

  const contenidos = [
    [
      {
        nombre: "Angulos Trigonometricos 1",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      },
      {
        nombre: "Angulos Trigonometricos 2",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      },
    ],
    [
      {
        nombre: "Angulos Complementarios 1",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      },
      {
        nombre: "Angulos Complementarios 2",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      },
    ],
    [
      {
        nombre: "Angulos Suplementarios 1",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      },
      {
        nombre: "Angulos Suplementarios 2",
        descripcion: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      },
    ],
  ];

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
  return (
    <div className="VCursoDocenteContenidoContainer">
      <div className="VCursoDocenteContenidoTitle">
        <h3>{curso.Nombre + " - " + curso.Grado}</h3>
      </div>
      <div className="VCurDoContenidoContenidoButtonsContainer">
        <Link className="LinkVCursoDocenCont" to="contenido" state={{ curso }}>
          <PrimaryButton nombre={"Contenido"} />
        </Link>
        <Link className="LinkVCursoDocenCont" to="tareas" state={{ curso }}>
          <PrimaryButton nombre={"Tareas"} />
        </Link>
      </div>

      <div className="VCurDocenCamb">
        <Routes>
        <Route
            index
            element={<Navigate to="contenido" replace state={{ curso }} />}
          />
          <Route
            path="contenido/descripcion"
            element={<VVerContenidoGeneral />}
          />
          <Route
            path="contenido/*"
            element={
              <VCursoDocenteContenidoContenido
                to="descripcion"
                curso={curso}
                contenidos={contenidos}
              />
            }
          />
          <Route path="tareas/descripcion" element={<VVerTareaGeneral />} />
          <Route
            path="tareas/*"
            element={
              <VCursoDocenteContenidoTareas
                to={"descripcion"}
                curso={curso}
                tareas={tareasCurso}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default VCursoDocenteAdministradorContenido;
