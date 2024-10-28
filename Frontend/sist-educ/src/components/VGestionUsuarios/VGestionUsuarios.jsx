import React from "react";
import "./VGestionUsuarios.css";
import PrimaryButton from "../generalsComponets/PrimaryButton/PrimaryButton";
import VGestionEstudiante from "./VGestionEstudiante/VGestionEstudiante";
import VGestionDocentes from "./VGestionDocentes/VGestionDocentes";
import { Routes, Route, Link } from 'react-router-dom';

function VGestionUsuarios() {

  

  let docentes = [
    {
      Dni: "2225262",
      Apellidos: "Maurtua Andrede",
      Nombres: "Jose Marcos",
      Celular: "985123265",
      Correo: "Maurtua@example.com",
      Nivel: "Secundaria",
      Cursos: ["Trigonometria", "Geometria"],
    },
    {
      Dni: "2598689",
      Apellidos: "Rodriguez Advincula",
      Nombres: "Maria Jesús",
      Celular: "945002356",
      Correo: "Rodriguez@example.com",
      Nivel: "Primaria",
      Cursos: [
        "Matematica - 1er",
        "Comunicación - 1er",
        "Personal Social - 1er",
      ],
    },
  ];
  return (
    <div className="VGestionUsuariosContainer">
      <div className="TitleGestionUsuarios">
        <h3>Gestion de Usuarios:</h3>
      </div>
      <div className="VGestionUsuariosButtonsContainer">
        <Link className="LinkVGestionUsuarios" to={"estudiantes"}>
        <PrimaryButton nombre={"Estudiantes"} />
        </Link>
        <Link className="LinkVGestionUsuarios" to={"docentes"}>
        <PrimaryButton  nombre={"Docentes"} />
        </Link>
      </div>
      <div className="CambGestionUsuarios">
        <Routes>
          <Route index element={<VGestionEstudiante />}/>
          <Route path="estudiantes" element={<VGestionEstudiante />}/>
          <Route path="docentes" element={<VGestionDocentes docentes={docentes}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default VGestionUsuarios;
