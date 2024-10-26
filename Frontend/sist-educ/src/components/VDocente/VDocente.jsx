import React from "react";
import "./VDocente.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ComponenteVacio from "../ComponenteVacio/ComponenteVacio";
import BarraNavegacionDocente from "../BarraNavegacionDocente/BarraNavegacionDocente";
import InfoUser from "../generalsComponets/InfoUser/InfoUser";
import VHorarioDocente from "../VHorarioEstudianteDocente/VHorarioEstudianteDocente";
import VCursosDocente from "../VCursosDocente/VCursosDocente";
import VCursoDocenteContenido from "../VCursoDocenteAdministradorContenido/VCursoDocenteAdministradorContenido";
import VTareasDocente from "../VTareasDocente/VTareasDocente";
import VNotasDocente from "../VNotasDocenteAdministrador/VNotasDocenteAdministrador";
import VHonorDocenteAdministrador from "../VHonorDocenteAdministrador/VHonorDocenteAdministrador";
import VInformesDocente from "../VInformesDocenteAdministrador/VInformesDocenteAdministrador";
import VChatDocente from "../VChatEstudianteDocente/VChatEstudianteDocente";

function VDocente() {
  let userDocente = {
    rol: "TEACHER",
    nombres: "Armando Fernando",
    apellidos: "Vega Moreno",
  };
  let cursosDocente = [
    {
      Nombre: "Trigonometria",
      Grado: "1° Año",
      Docente: "Fernadez Flores Jose Marcos",
    },
    {
      Nombre: "Trigonometria",
      Grado: "2° Año",
      Docente: "Fernadez Flores Jose Marcos",
    },
    {
      Nombre: "Geometria",
      Grado: "1° Año",
      Docente: "Fernadez Flores Jose Marcos",
    },
    {
      Nombre: "Geometria",
      Grado: "2° Año",
      Docente: "Fernadez Flores Jose Marcos",
    },
  ];
  return (
    <BrowserRouter>
      <div className="VDocenteMain">
        <BarraNavegacionDocente />
        <div className="containerCambDocente">
          <Routes>
            <Route path="/" element={<Navigate to="/cursos" />} />
            <Route path="/cursos/*" element={<VCursosDocente cursos={cursosDocente} />} />
            <Route path="/horario" element={<VHorarioDocente grado_Apellidos={userDocente.apellidos} nivel_Nombres={userDocente.nombres}/>} />
            <Route path="/tareas/*" element={<VTareasDocente />} />
            <Route path="/chat" element={<VChatDocente />} />
            <Route path="/notas/*" element={<VNotasDocente />} />
            <Route path="/honor/*" element={<VHonorDocenteAdministrador />} />
            <Route path="/curso/*" element={<VCursoDocenteContenido/>} />
            <Route path="/informes/*" element={<VInformesDocente />} />
            <Route path="/usuario" element={<InfoUser user={userDocente} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default VDocente;
