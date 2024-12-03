import React, { useEffect, useState } from "react";
import "./VDocente.css";
import { Route, Routes, Navigate } from "react-router-dom";
import BarraNavegacionDocente from "../BarraNavegacionDocente/BarraNavegacionDocente";
import InfoUser from "../generalsComponets/InfoUser/InfoUser";
import VHorarioDocente from "../VHorarioEstudianteDocente/VHorarioEstudianteDocente";
import VCursosDocente from "../VCursosDocente/VCursosDocente";
import VCursoDocenteContenido from "../VCursoDocenteAdministradorContenido/VCursoDocenteAdministradorContenido";
import VNotasDocente from "../VNotasDocenteAdministrador/VNotasDocenteAdministrador";
import VHonorDocenteAdministrador from "../VHonorDocenteAdministrador/VHonorDocenteAdministrador";
import VInformesDocente from "../VInformesDocenteAdministrador/VInformesDocenteAdministrador";
import subcursoService from "../../services/subcursoService";
import Chatbot from "../generalsComponets/CardChat/CardChat";


function VDocente() {
  const [cursos, setCursos] = useState([]);
  const [userDocente, setUserDocente] = useState({});
  const [componentToShow, setComponentToShow] = useState("Cursos");

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserDocente(userData || {});

    if (userData) {
      subcursoService
        .listarSubcursosPorUsuario(userData.usuarioId, userData.rol)
        .then((response) => {
          let grado=0;
          setCursos(
            response.data.map((curso) => {
              const profesorAsignado = curso.asignacionesProfesor[0]?.profesor || {};
              return {
                Nombre: curso.nombre,
                Nivel: curso.nivel,
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
  function agregargrado(curso){
    let cursostemp=[];
  
    for(let i=1; i<=5;i++){
      let cursoaux={
        Nombre: curso.Nombre,
        Nivel: curso.Nivel,
        Docente:curso.Docente,
        Grado: i + "°"
        
      }
      cursostemp.push(cursoaux);
    }
    return cursostemp;
  }

 let cursos2=[];





cursos.map((curso)=>(
  cursos2.push(...agregargrado(curso))
));


  return (

      <div className="VDocenteMain">
        <BarraNavegacionDocente nombre={userDocente.nombre} apellido={userDocente.apellido} />
        <div className="containerCambDocente">
          <Routes>
            <Route index element={<Navigate to="cursos" />} />
            <Route path="cursos/*" element={<VCursosDocente cursos={cursos2} />} />
            <Route path="horario" element={<VHorarioDocente grado_Apellidos={userDocente.apellido} nivel_Nombres={userDocente.nombre}/>} />
            <Route path="notas/*" element={<VNotasDocente />} />
            <Route path="honor/*" element={<VHonorDocenteAdministrador />} />
            <Route path="curso/*" element={<VCursoDocenteContenido/>} />
            <Route path="informes/*" element={<VInformesDocente />} />
            <Route path="usuario" element={<InfoUser/>} />
          </Routes>
        </div>
        <Chatbot/>
      </div>
  );
}

export default VDocente;
