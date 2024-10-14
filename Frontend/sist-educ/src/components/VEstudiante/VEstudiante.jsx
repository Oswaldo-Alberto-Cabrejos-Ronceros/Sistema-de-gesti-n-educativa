import React from "react";
import "./VEstudiante.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BarraNavegacion from "../BarraNavegacionEstudiante/BarraNavegacionEstudiante";
import VNotasDocentes from "../VNotasDocentes/VNotasDocentes";
import VSubirNotas from "../VNotasDocentes/VSubirNotas/VSubirNotas";
//import ComponenteVacio from "../ComponenteVacio/ComponenteVacio";
import VCursosDocente from "../VCursosDocente/VCursosDocente";
import VCursoDocenteContenido from "../VCursosDocente/VCursoDocenteContenido/VCursoDocenteContenido";
import VVerNotasDocentes from "../VNotasDocentes/VVerNotasDocentes/VVerNotasDocentes";
//import VEstudiante from "../VEstudiante/VEstudiante";
import InfoUser from "../generalsComponets/InfoUser/InfoUser";
import VCursosAdministrador from "../VCursosAdministrador/VCursosAdministrador";
import VGestionCursos from "../VGestionCursos/VGestionCursos";
import VGestionUsuarios from "../VGestionUsuarios/VGestionUsuarios";
import ComponenteVacio from "../ComponenteVacio/ComponenteVacio";
import VHonorEstudiante from "../VHonorEstudiante/VHonorEstudiante";
import VCursosEstudiante from "../VCursosEstudiante/VCursosEstudiante";
import VCursosEstudianteContenido from "../VCursosEstudiante/VCursoEstudianteContenido/VCursoEstudianteContenido";
import VHorarioEstudiante from "../VHorarioEstudiante/VHorarioEstudiante";
import VTareasEstudiante from "../VTareasEstudiante/VTareasEstudiante";

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
  let userAlumno = {
    rol: "STUDENT",
    nombres: "Edilberto Nicolas",
    apellidos: "Chumbivilca Flores",
    grado: "6to",
    nivel: "Primaria",
  };
  let userDocente = {
    rol: "TEACHER",
    nombres: "Armando Fernando",
    apellidos: "Vega Moreno",
  };
  let userAdministrador = {
    rol: "ADMINISTRATOR",
    nombres: "Cesar Augusto",
    apellidos: "Cabrera Wuffarden",
  };
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

  const tareasCurso = [
    [
      {
        nombre: "Tarea: Angulos Trigonometricos 1",
        link: "https://www.youtube.com/",
        fechaEntrega: "12/05/2024",
      },
      {
        nombre: "Tarea: Angulos Trigonometricos 2",
        link: "https://www.youtube.com/",
        fechaEntrega: "12/05/2024",
      },
    ],
    [
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
    ],
    [
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
    ],
  ];

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
      <div className="main">
        <BarraNavegacion onOptionSelect={handleOptionSelect} />
        <div className="containerCamb">
          <Routes>
            <Route
              path="/cursos/*"
              element={<VCursosEstudiante cursos={cursos} />}
            />
            <Route
              path="/horario"
              element={
                <VHorarioEstudiante
                  grado={userAlumno.grado}
                  nivel={userAlumno.nivel}
                />
              }
            />
            <Route path="/tareas/*" element={<VTareasEstudiante />} />
            <Route path="/chat" element={<ComponenteVacio />} />
            <Route
              path="/notas"
              element={
                <VGestionCursos
                  cursos={cursosGestion}
                  subcursos={subcursosGestion}
                />
              }
            />
            <Route path="/honor" element={<VHonorEstudiante />} />
            <Route path="/curso/*" element={<VCursosEstudianteContenido />} />
            <Route path="/usuario" element={<InfoUser user={userAlumno} />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default VEstudiante;
