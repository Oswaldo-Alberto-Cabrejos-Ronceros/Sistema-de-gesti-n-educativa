import React from "react";
import "./VDocente.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ComponenteVacio from "../ComponenteVacio/ComponenteVacio";
import BarraNavegacionDocente from "../BarraNavegacionDocente/BarraNavegacionDocente";
import InfoUser from "../generalsComponets/InfoUser/InfoUser";
import VHorarioDocente from "../VHorarioEstudianteDocente/VHorarioEstudianteDocente";

function VDocente() {
  let userDocente = {
    rol: "TEACHER",
    nombres: "Armando Fernando",
    apellidos: "Vega Moreno",
  };
  return (
    <BrowserRouter>
      <div className="VDocenteMain">
        <BarraNavegacionDocente />
        <div className="containerCamb">
          <Routes>
            <Route path="/" element={<Navigate to="/cursos" />} />
            <Route path="/cursos/*" element={<ComponenteVacio />} />
            <Route path="/horario" element={<VHorarioDocente grado_Apellidos={userDocente.apellidos} nivel_Nombres={userDocente.nombres}/>} />
            <Route path="/tareas/*" element={<ComponenteVacio />} />
            <Route path="/chat" element={<ComponenteVacio />} />
            <Route path="/notas/*" element={<ComponenteVacio />} />
            <Route path="/honor/*" element={<ComponenteVacio />} />
            <Route path="/curso/*" element={<ComponenteVacio />} />
            <Route path="/informes/*" element={<ComponenteVacio />} />
            <Route path="/usuario" element={<InfoUser user={userDocente} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default VDocente;
