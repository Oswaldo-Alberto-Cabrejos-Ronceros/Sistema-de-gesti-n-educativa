import React from 'react'
import './VAdministrador.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ComponenteVacio from '../ComponenteVacio/ComponenteVacio';
import InfoUser from '../generalsComponets/InfoUser/InfoUser';
import BarraNavegacionAdministrador from '../BarraNavegacionAdministrador/BarraNavegacionAdministrador';
import VNotasAdministrador from '../VNotasDocenteAdministrador/VNotasDocenteAdministrador';
import VHonorAdministrador from '../VHonorDocenteAdministrador/VHonorDocenteAdministrador';
import VInformesAdministrador from '../VInformesDocenteAdministrador/VInformesDocenteAdministrador';
import VCursosAdministrador from '../VCursosAdministrador/VCursosAdministrador';
import VCursoAdministradorContenido from '../VCursoDocenteAdministradorContenido/VCursoDocenteAdministradorContenido';

function VAdministrador() {
  let userAdministrador = {
    rol: "ADMINISTRATOR",
    nombres: "Cesar Augusto",
    apellidos: "Cabrera Wuffarden",
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
    <div className='VAdministradorMain'>
      <BarraNavegacionAdministrador/>
      <div className='containerCambAdministrador'>
      <Routes>
      <Route path="/" element={<Navigate to="/cursos" />} />
            <Route path="/cursos/*" element={<VCursosAdministrador cursos={cursosDocente} />} />
            <Route path="/horario" element={<ComponenteVacio/>} />
            <Route path="/tareas/*" element={<ComponenteVacio/>} />
            <Route path="/notas/*" element={<VNotasAdministrador/>} />
            <Route path="/usuarios/*" element={<ComponenteVacio/>} />
            <Route path="/gestioncursos/*" element={<ComponenteVacio/>} />
            <Route path="/honor/*" element={<VHonorAdministrador/>} />
            <Route path="/curso/*" element={<VCursoAdministradorContenido/>} />
            <Route path="/informes/*" element={<VInformesAdministrador/>} />
            <Route path="/usuario" element={<InfoUser user={userAdministrador} />} />
      </Routes>
      </div>
    </div>
    </BrowserRouter>
  )
}

export default VAdministrador