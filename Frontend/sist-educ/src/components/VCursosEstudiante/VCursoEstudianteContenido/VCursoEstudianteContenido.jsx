import React from "react";
import "./VCursoEstudianteContenido.css";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import { useLocation } from "react-router-dom";
import {Routes, Route, Link} from "react-router-dom";
import VCursoEstudianteContenidoContenido from "./VCursoEstudianteContenidoContenido/VCursoEstudianteContenidoContenido";
import VCursoEstudianteContenidoTareas from "./VCursoEstudianteContenidoTareas/VCursoEstudianteContenidoTareas";

function VCursoEstudianteContenido() {
  const location= useLocation();
  const {curso}=location.state;
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

    const tareas = [
    [
      {
        nombre: "Tarea: Angulos Trigonometricos 1",
        link: "https://www.youtube.com/",
      },
      {
        nombre: "Tarea: Angulos Trigonometricos 2",
        link: "https://www.youtube.com/",
      },
    ],
    [
      { nombre: "Tarea: Angulos Complementarios 1", link: "https://www.youtube.com/" },
      {
        nombre: "Tarea: Angulos Complementarios 2",
        link: "https://www.youtube.com/",
      },
    ],
    [
      {
        nombre: "Tarea: Angulos Suplementarios 1",
        link: "https://www.youtube.com/",
      },
      {
        nombre: "Tarea: Angulos Suplementarios 2",
        link: "https://www.youtube.com/",
      },
    ],
  ];

  return (
    <div className="VCursoEstudianteDetalleContainer">
      <div className="VCursoEstudianteDetalleTitle">
        <h3>{curso.Nombre}</h3>
      </div>
      <div className="VCurEstudianteButtonsContainer">
        <Link className="LinkVCursoEstCont" to="contenido" state={{curso}}>
        <PrimaryButton nombre={"Contenido"} />
        </Link>
        <Link className="LinkVCursoEstCont" to="tareas" state={{curso}}>
        <PrimaryButton nombre={"Tareas"} />
        </Link>
      </div>

      <div className="VCurEstudianteCamb">
      <Routes>
      <Route index element={<VCursoEstudianteContenidoContenido contenidos={contenidos}/>}/>
      <Route path="contenido" element={<VCursoEstudianteContenidoContenido contenidos={contenidos}/>}/>
      <Route path="tareas" element={<VCursoEstudianteContenidoTareas tareas={tareas}/>}/>
      </Routes>
      </div>

    </div>
  );
}

export default VCursoEstudianteContenido;
