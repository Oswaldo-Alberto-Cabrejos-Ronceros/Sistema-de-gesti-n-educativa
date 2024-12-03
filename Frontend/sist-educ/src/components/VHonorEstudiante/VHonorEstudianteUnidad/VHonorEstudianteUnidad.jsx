import React,{useState,useEffect} from "react";
import "./VHonorEstudianteUnidad.css";
import CardHonor from "../../generalsComponets/CardHonor/CardHonor"
import alumnoService from "../../../services/alumnoService";

function VHonorEstudianteUnidad() {
  const [alumnos, setAlumnos] = useState([]);
  const [userAlumno, setUserAlumno] = useState({});

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    setUserAlumno(userData || {});
  }, []);

  useEffect(() => {
    alumnoService.listarAlumnosPorGradoNivelConMayorPromedio(userAlumno.grado, userAlumno.nivel)
      .then(response => {
        setAlumnos(response.data); // Guarda los datos en el estado
      })
      .catch(error => {
        console.error("Error al obtener los alumnos:", error);
      });
  }, [userAlumno.grado, userAlumno.nivel]);




  let info=[userAlumno.grado,userAlumno.seccion, userAlumno.nivel]
  return (
    <div className="VHonorEstudianteUnidadContainer">
      <div className="TitleHonorEstudianteUnidadContainer">
        <h3>General</h3>
      </div>
      <div className="VHonorEstudianteUnidadContent">
        <CardHonor info={info} estudiantesHonor={alumnos}/>
      </div>
    </div>
  );
}

export default VHonorEstudianteUnidad;
