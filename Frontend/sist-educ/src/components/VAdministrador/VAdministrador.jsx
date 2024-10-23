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
import VHorarioAdministrador from '../VHorarioAdministrador/VHorarioAdministrador'
import VGestionCursos from '../VGestionCursos/VGestionCursos';
import VGestionUsuarios from '../VGestionUsuarios/VGestionUsuarios'
import VTareasAdministrador from '../VTareasAdministrador/VTareasAdministrador';

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
  let cursosGestion = [
    {
      Nombre: "Matematica",
      Descripcion: "Curso de numeros",
      Nivel: "Secundaria",
      Subcursos: ["Aritmetica", "Algebra", "Trigonometria"],
    },
    {
      Nombre: "Comunicacion",
      Descripcion: "Curso de letras",
      Nivel: "Secundaria",
      Subcursos: ["Lenguaje", "Razonamiento Verbal", "Literatura"],
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
  let estudiantes = [
    {
      Dni: "7894561",
      Apellidos: "Fujimori Higuchi",
      Nombres: "Alberto Fernando",
      Celular: "984859568",
      Correo: "Alberto@example.com",
      Nivel: "Primaria",
      Grado: "6to",
      Seccion: "A",
    },
    {
      Dni: "7895445",
      Apellidos: "Vizcarra Fujimori",
      Nombres: "Keiko Sofia",
      Celular: "994489860",
      Correo: "Alberto@example.com",
      Nivel: "Primaria",
      Grado: "5to",
      Seccion: "B",
    },
  ];

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
    <BrowserRouter>
    <div className='VAdministradorMain'>
      <BarraNavegacionAdministrador/>
      <div className='containerCambAdministrador'>
      <Routes>
      <Route path="/" element={<Navigate to="/cursos" />} />
            <Route path="/cursos/*" element={<VCursosAdministrador cursos={cursosDocente} />} />
            <Route path="/horario/*" element={<VHorarioAdministrador/>} />
            <Route path="/tareas/*" element={<VTareasAdministrador />} />
            <Route path="/notas/*" element={<VNotasAdministrador/>} />
            <Route path="/gestionusuarios/*" element={<VGestionUsuarios estudiantes={estudiantes} docentes={docentes}/>} />
            <Route path="/gestioncursos/*" element={<VGestionCursos cursos={cursosGestion} subcursos={subcursosGestion} />} />
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