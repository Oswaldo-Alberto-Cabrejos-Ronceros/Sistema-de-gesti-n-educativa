import React, {useState, useEffect} from 'react'
import './VAdministrador.css'
import {Route, Routes, Navigate } from "react-router-dom";
import InfoUser from '../generalsComponets/InfoUser/InfoUser';
import BarraNavegacionAdministrador from '../BarraNavegacionAdministrador/BarraNavegacionAdministrador';
import VNotasAdministrador from '../VNotasAdministrador/VNotasAdministrador';
import VHonorAdministrador from '../VHonorDocenteAdministrador/VHonorDocenteAdministrador';
import VInformesAdministrador from '../VInformesDocenteAdministrador/VInformesDocenteAdministrador';
import VCursosAdministrador from '../VCursosAdministrador/VCursosAdministrador';
import VCursoAdministradorContenido from '../VCursoDocenteAdministradorContenido/VCursoDocenteAdministradorContenido';
import VHorarioAdministrador from '../VHorarioAdministrador/VHorarioAdministrador'
import VGestionCursos from '../VGestionCursos/VGestionCursos';
import VGestionUsuarios from '../VGestionUsuarios/VGestionUsuarios'


function VAdministrador() {
  const [userUser, setUser] = useState(null);
  

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser  || {nombre:"Admin", apellido:"Admin"});
    }
  }, []);
  console.log(userUser)

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
  let subcursosGestion = [
    {
      Nombre: "Trigonometria",
      Curso: "Matematica",
      Descripcion: "Curso sobre triangulos",
      Docente: "Maurtua Lopez, Antonio Jose",
    },
    {
      Nombre: "Geometria",
      Curso: "Matematica",
      Descripcion: "Curso sobre poligonos",
      Docente: "Maurtua Lopez, Antonio Jose",
    },
    {
      Nombre: "Lenguaje",
      Curso: "Comunicacíon",
      Descripcion: "Curso sobre gramatica y lexico",
      Docente: "Rodriguez Saavedra, Paolo Christian",
    },
    {
      Nombre: "Literatura",
      Curso: "Comunicacíon",
      Descripcion: "Curso sobre literatura",
      Docente: "Rodriguez Saavedra, Paolo Christian",
    },
  ];
  


  return (
    <div className='VAdministradorMain'>
      <BarraNavegacionAdministrador/>
      <div className='containerCambAdministrador'>
      <Routes>
      <Route index element={<Navigate to="cursos" />} />
            <Route path="cursos/*" element={<VCursosAdministrador cursos={cursosDocente} />} />
            <Route path="horario/*" element={<VHorarioAdministrador/>} />
            <Route path="notas/*" element={<VNotasAdministrador/>} />
            <Route path="gestionusuarios/*" element={<VGestionUsuarios />} />
            <Route path="gestioncursos/*" element={<VGestionCursos subcursos={subcursosGestion} />} />
            <Route path="honor/*" element={<VHonorAdministrador/>} />
            <Route path="curso/*" element={<VCursoAdministradorContenido/>} />
            <Route path="informes/*" element={<VInformesAdministrador/>} />
            <Route path="usuario" element={<InfoUser />} />
      </Routes>
      </div>
    </div>

  )
}

export default VAdministrador