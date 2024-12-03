import React,{useState, useEffect} from "react";
import './VNotasEstudianteCurso.css'
import ComponentNotasEstudianteElement from "../../generalsComponets/ComponentNotasEstudianteElement/ComponentNotasEstudianteElement";
import subcursoService from "../../../services/subcursoService";

function VNotasEstudianteCurso() {
  const [cursos, setCursos] = useState([]);
  const [userAlumno, setUserAlumno] = useState({});
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
                Id:curso.subcursoId,
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

  
  return (
    <div className="VNotasEstudianteCursoContainer">
    {
      cursos.map((curso)=>(
        <ComponentNotasEstudianteElement title={curso.Nombre} tipo={"curso"} indicador={curso.Id}/>
      ))
    }
    </div>
  );
}

export default VNotasEstudianteCurso;
