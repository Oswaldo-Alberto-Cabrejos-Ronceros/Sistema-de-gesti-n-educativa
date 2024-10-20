import React from "react";
import "./VCursoDocenteContenido.css";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import { useLocation } from "react-router-dom";
import { Routes, Route, Link } from "react-router-dom";
import VCursoDocenteContenidoContenido from "./VCursoDocenteContenidoContenido/VCursosDocenteContenidoContenido";
import VCursoDocenteContenidoTareas from "./VCursoDocenteContenidoTareas/VCursoDocenteContenidoTareas";

function VCursoDocenteContenido() {
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
      <Route path="tareas" element={<VCursoDocenteContenidoTareas/>}/>
      </Routes>
      </div>
  </div>;
}

export default VCursoDocenteContenido;
