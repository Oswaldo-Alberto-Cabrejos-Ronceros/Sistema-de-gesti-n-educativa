import React from "react";
import "./VCursoEstudianteContenido.css";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import { useLocation } from "react-router-dom";
import {Routes, Route, Link, Navigate} from "react-router-dom";
import VCursoEstudianteContenidoContenido from "./VCursoEstudianteContenidoContenido/VCursoEstudianteContenidoContenido";
import VCursoEstudianteContenidoTareas from "./VCursoEstudianteContenidoTareas/VCursoEstudianteContenidoTareas";
import VVerContenidoGeneral from "../../VVerContenidoGeneral/VVerContenidoGeneral";

function VCursoEstudianteContenido() {
  const location= useLocation();
  let {curso}=location.state|| {};
  if(curso===undefined){
      curso=location.state.curso;
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
      { nombre: "Angulos Complementarios 1", 
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
      <Route index element={<Navigate to="contenido" replace state={{curso}}/>}/>
      <Route path="contenido/descripcion" element={<VVerContenidoGeneral/>}/>
      <Route path="contenido/*" element={<VCursoEstudianteContenidoContenido to={"descripcion"} curso={curso} contenidos={contenidos}/>}/>
      <Route path="tareas/*" element={<VCursoEstudianteContenidoTareas tareas={tareas}/>}/>
      </Routes>
      </div>

    </div>
  );
}

export default VCursoEstudianteContenido;
