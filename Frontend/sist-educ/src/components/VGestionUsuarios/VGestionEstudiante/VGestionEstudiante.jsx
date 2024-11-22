import React, { useEffect, useState } from "react";
import AlumnoService from "../../../services/alumnoService"; 
import "./VGestionEstudiante.css";
import TablaGestionEstudiantes from "./TablaGestionEstudiantes/TablaGestionEstudiantes";
import FormularioAgregarEstudiante from "./FormularioAgregarEstudiante/FormularioAgregarEstudiante";
import SearchComponent from "../../generalsComponets/SearchComponent/SearchComponent";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";


function VGestionEstudiante() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formularioIsVisible, setformularioIsVisible] = useState(false);
  const [error, setError] = useState(null);

  // Función para alternar la visibilidad
  const toggleVisibility = () => {
    setformularioIsVisible(!formularioIsVisible);
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const fetchEstudiantes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await AlumnoService.getAllAlumno();
      setEstudiantes(response.data);
    } catch (error) {
      setError("Error al cargar estudiantes. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar estudiante en vivo
  const handleStudentDeleted = (deletedId) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.filter((estudiante) => estudiante.usuarioId !== deletedId)
    );
  };

  // Actualizar estudiante en vivo
  const handleStudentUpdated = (updatedStudent) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((estudiante) =>
        estudiante.usuarioId === updatedStudent.usuarioId ? updatedStudent : estudiante
      )
    );
  };

  if (loading) return <div>Cargando estudiantes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="VGestionEstudianteContainer">
      <div className="TitleGestionEstudiante">
        <h3>Estudiantes</h3>
      </div>
      <div className='VGestionEstudianteContainerSearch'>
        <SearchComponent nombre={"Cursos"} placeholder={"Buscar Estudiante"} />
        </div>
      <div className="VGestionEstudiantesContent">
        <div>
          <TablaGestionEstudiantes
            estudiantes={estudiantes}
            onStudentDeleted={handleStudentDeleted}
            onStudentUpdated={handleStudentUpdated}
          />
        </div>
        <div className="ButtonFormularioContent">
        <PrimaryButton nombre={formularioIsVisible ? "Ocultar" : "Mostrar" } onClick={toggleVisibility}/>
        </div>
        {formularioIsVisible &&  <FormularioAgregarEstudiante onStudentAdded={fetchEstudiantes} />}
      </div>
    </div>
  );
}

export default VGestionEstudiante;