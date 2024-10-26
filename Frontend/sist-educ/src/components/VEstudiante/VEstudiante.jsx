import React from "react";
import "./VEstudiante.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import BarraNavegacion from "../BarraNavegacionEstudiante/BarraNavegacionEstudiante";
//import ComponenteVacio from "../ComponenteVacio/ComponenteVacio";
import VCursosDocente from "../VCursosDocente/VCursosDocente";
//import VEstudiante from "../VEstudiante/VEstudiante";
import InfoUser from "../generalsComponets/InfoUser/InfoUser";
import VCursosAdministrador from "../VCursosAdministrador/VCursosAdministrador";
import VGestionCursos from "../VGestionCursos/VGestionCursos";
import VGestionUsuarios from "../VGestionUsuarios/VGestionUsuarios";
import ComponenteVacio from "../ComponenteVacio/ComponenteVacio";
import VHonorEstudiante from "../VHonorEstudiante/VHonorEstudiante";
import VCursosEstudiante from "../VCursosEstudiante/VCursosEstudiante";
import VCursosEstudianteContenido from "../VCursosEstudiante/VCursoEstudianteContenido/VCursoEstudianteContenido";
import VHorarioEstudiante from "../VHorarioEstudianteDocente/VHorarioEstudianteDocente";
import VTareasEstudiante from "../VTareasEstudiante/VTareasEstudiante";
import VNotasEstudiante from "../VNotasEstudiante/VNotasEstudiante";
import VChatEstudiante from "../VChatEstudianteDocente/VChatEstudianteDocente";

function VEstudiante() {
  let curso = {
    nombre: "Matematica",
    grado: "6to",
    seccion: "Unica",
    nivel: "Primaria",
  };
  const [componentToShow, setComponentToShow] = useState("Cursos");
  const handleOptionSelect = (option) => {
    setComponentToShow(option);
  };
  let curso2 = {
    nombre: "Matematicas",
    imagen: "https://definicion.de/wp-content/uploads/2008/06/asignatura.png",
    codigo: "789456",
    modalidad: "Presencial",
    profesor: "Loo Parian Luis Alberto",
  };
  let cursoarray = [curso2];
  let tarea = [
    {
      titulo: "Semana 1",
      curso: "Matematicas",
      fechaVecimiento: "10 de Agosto",
    },
  ];
  //
  let cursos = [
    {
      Nombre: "Trigonometria",
      Docente: "Fernadez Flores Jose Marcos",
    },
    {
      Nombre: "Lenguaje",
      Docente: "Huanta Villegas Mirta Juanita",
    },
    {
      Nombre: "Geometria",
      Docente: "Fernadez Flores Jose Marcos",
    },
    {
      Nombre: "Literatura",
      Docente: "Huanta Villegas Mirta Juanita",
    },
  ];
  
  let userAlumno = {
    rol: "STUDENT",
    nombres: "Edilberto Nicolas",
    apellidos: "Chumbivilca Flores",
    grado: "6to",
    nivel: "Primaria",
  };
  let userAdministrador = {
    rol: "ADMINISTRATOR",
    nombres: "Cesar Augusto",
    apellidos: "Cabrera Wuffarden",
  };
  


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
    <BrowserRouter>
      <div className="VEstudianteMain">
        <BarraNavegacion onOptionSelect={handleOptionSelect} />
        <div className="containerCamb">
          <Routes>
          <Route path="/" element={<Navigate to="/cursos" />} />
            <Route
              path="/cursos/*"
              element={<VCursosEstudiante cursos={cursos} />}
            />
            <Route
              path="/horario"
              element={
                <VHorarioEstudiante
                grado_Apellidos={userAlumno.grado}
                nivel_Nombres={userAlumno.nivel}
                />
              }
            />
            <Route path="/tareas/*" element={<VTareasEstudiante />} />
            <Route path="/chat" element={<VChatEstudiante />} />
            <Route path="/notas/*" element={<VNotasEstudiante />} />
            <Route path="/honor/*" element={<VHonorEstudiante />} />
            <Route path="/curso/*" element={<VCursosEstudianteContenido />} />
            <Route path="/usuario" element={<InfoUser user={userAlumno} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default VEstudiante;
