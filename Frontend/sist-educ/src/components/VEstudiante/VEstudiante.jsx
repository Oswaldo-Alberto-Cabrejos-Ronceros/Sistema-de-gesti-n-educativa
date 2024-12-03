import React, { useEffect, useState } from "react";
import "./VEstudiante.css";
import { Routes, Route, Navigate } from "react-router-dom";
import subcursoService from "../../services/subcursoService";
import BarraNavegacion from "../BarraNavegacionEstudiante/BarraNavegacionEstudiante";
import InfoUser from "../generalsComponets/InfoUser/InfoUser";
import VHonorEstudiante from "../VHonorEstudiante/VHonorEstudiante";
import VCursosEstudiante from "../VCursosEstudiante/VCursosEstudiante";
import VCursosEstudianteContenido from "../VCursosEstudiante/VCursoEstudianteContenido/VCursoEstudianteContenido";
import VHorarioEstudiante from "../VHorarioEstudianteDocente/VHorarioEstudianteDocente";
import VNotasEstudiante from "../VNotasEstudiante/VNotasEstudiante";
import ChatBot from '../generalsComponets/CardChat/CardChat'

function VEstudiante() {
  const [cursos, setCursos] = useState([]);
  const [userAlumno, setUserAlumno] = useState({});
  const [componentToShow, setComponentToShow] = useState("Cursos");

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserAlumno(userData || {});

    if (userData) {
      subcursoService
        .listarSubcursosPorUsuario(userData.usuarioId, userData.rol)
        .then((response) => {
          setCursos(
            response.data.map((curso) => {
              const profesorAsignado = curso.asignacionesProfesor[0]?.profesor || {};
              return {
                Nombre: curso.nombre,
                Nivel: curso.nivel,
                SubcursoId:curso.subcursoId,
                Docente: profesorAsignado.nombre && profesorAsignado.apellido
                  ? `${profesorAsignado.nombre} ${profesorAsignado.apellido}`
                  : "No asignado",
              };
            })
          );
        })
        .catch((error) => console.error("Error al obtener los cursos:", error));
    }
  }, []);

  const handleOptionSelect = (option) => {
    setComponentToShow(option);
  };

  return (
      <div className="VEstudianteMain">
        <BarraNavegacion onOptionSelect={handleOptionSelect} nombre={userAlumno.nombre} apellido={userAlumno.apellido}/>
        <div className="containerCamb">
          <Routes>
          <Route index element={<Navigate to="cursos" />} />
            <Route
              path="cursos/*"
              element={<VCursosEstudiante cursos={cursos} />}
            />
            <Route
              path="horario"
              element={
                <VHorarioEstudiante
                grado_Apellidos={userAlumno.grado + " " + userAlumno.seccion }
                nivel_Nombres={userAlumno.nivel}
                />
              }
            />
            <Route path="notas/*" element={<VNotasEstudiante />} />
            <Route path="honor/*" element={<VHonorEstudiante />} />
            <Route path="curso/*" element={<VCursosEstudianteContenido grado={userAlumno.grado}/>} />
            <Route path="usuario" element={<InfoUser/>} />
            
          </Routes>
        </div>
        <ChatBot/>
      </div>
  );
}

export default VEstudiante;
