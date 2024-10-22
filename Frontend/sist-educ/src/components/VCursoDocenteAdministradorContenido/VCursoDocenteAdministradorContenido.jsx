import React from "react";
import "./VCursoDocenteAdministradorContenido.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import { useLocation } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import VCursoDocenteContenidoContenido from "./VCursoDocenteAdministradorContenidoContenido/VCursosDocenteAdministradorContenidoContenido";
import VCursoDocenteContenidoTareas from "./VCursoDocenteAdministradorContenidoTareas/VCursoDocenteAdministradorContenidoTareas";

function VCursoDocenteAdministradorContenido() {
  const location = useLocation();
  const { curso } = location.state;
  const contenidos = [
    [
      {
        nombre: "Angulos Trigonometricos 1",
        link: "https://www.youtube.com/",
      },
      {
        nombre: "Angulos Trigonometricos 2",
        link: "https://www.youtube.com/",
      },
    ],
    [
      { nombre: "Angulos Complementarios 1", link: "https://www.youtube.com/" },
      {
        nombre: "Angulos Complementarios 2",
        link: "https://www.youtube.com/",
      },
    ],
    [
      {
        nombre: "Angulos Suplementarios 1",
        link: "https://www.youtube.com/",
      },
      {
        nombre: "Angulos Suplementarios 2",
        link: "https://www.youtube.com/",
      },
    ],
  ];
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
  return <div className="VCursoDocenteContenidoContainer">
          <div className="VCursoDocenteContenidoTitle">
        <h3>{curso.Nombre + " - " + curso.Grado}</h3>
      </div>
      <div className="VCurDoContenidoContenidoButtonsContainer">
      <Link className="LinkVCursoDocenCont" to="contenido" state={{curso}}>
        <PrimaryButton nombre={"Contenido"} />
        </Link>
        <Link className="LinkVCursoDocenCont" to="tareas" state={{curso}}>
        <PrimaryButton nombre={"Tareas"} />
        </Link>
      </div>
      
      <div className="VCurDocenCamb">
      <Routes>
      <Route index element={<VCursoDocenteContenidoContenido contenidos={contenidos}/>}/>
      <Route path="contenido" element={<VCursoDocenteContenidoContenido contenidos={contenidos}/>}/>
      <Route path="tareas" element={<VCursoDocenteContenidoTareas tareas={tareasCurso}/>}/>
      </Routes>
      </div>
  </div>;
}

export default VCursoDocenteAdministradorContenido;
