import React, { useEffect, useState } from "react";
import AlumnoService from "../../../services/alumnoService"; 
import "./VGestionEstudiante.css";
import TablaGestionEstudiantes from "./TablaGestionEstudiantes/TablaGestionEstudiantes";
import FormularioAgregarEstudiante from "./FormularioAgregarEstudiante/FormularioAgregarEstudiante";

function VGestionEstudiante() {
  const [estudiantes, setEstudiantes] = useState([]); // Estado para almacenar estudiantes
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  // Función para obtener estudiantes del backend
  const fetchEstudiantes = async () => {
    setLoading(true);
    setError(null); // Resetear error antes de cargar nuevos datos
    try {
      const response = await AlumnoService.getAllAlumno();
      console.log("Estudiantes recibidos:", response.data);
      setEstudiantes(response.data);
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
      setError("Error al cargar estudiantes. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar estudiante de la lista en vivo
  const handleStudentDeleted = (deletedId) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.filter((estudiante) => estudiante.usuarioId !== deletedId)
    );
  };

  // Mensaje de carga o error
  if (loading) return <div>Cargando estudiantes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="VGestionEstudianteContainer">
      <div className="TitleGestionEstudiante">
        <h3>Gestión de Estudiantes:</h3>
      </div>
      <div className="VGestionEstudiantesContent">
        <div>
          <TablaGestionEstudiantes
            estudiantes={estudiantes}
            onStudentDeleted={handleStudentDeleted}
          />
        </div>
        {/* Pasamos fetchEstudiantes como prop para actualizar la lista tras agregar un estudiante */}
        <FormularioAgregarEstudiante onStudentAdded={fetchEstudiantes} />
      </div>
    </div>
  );
}

export default VGestionEstudiante;