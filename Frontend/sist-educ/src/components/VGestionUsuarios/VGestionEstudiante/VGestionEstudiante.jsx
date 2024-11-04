import React, { useEffect, useState } from "react";
import AlumnoService from "../../../services/alumnoService"; 
import "./VGestionEstudiante.css";
import TablaGestionEstudiantes from "./TablaGestionEstudiantes/TablaGestionEstudiantes";
import FormularioAgregarEstudiante from "./FormularioAgregarEstudiante/FormularioAgregarEstudiante";

function VGestionEstudiante() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        <h3>Gestión de Estudiantes:</h3>
      </div>
      <div className="VGestionEstudiantesContent">
        <div>
          <TablaGestionEstudiantes
            estudiantes={estudiantes}
            onStudentDeleted={handleStudentDeleted}
            onStudentUpdated={handleStudentUpdated}
          />
        </div>
        <FormularioAgregarEstudiante onStudentAdded={fetchEstudiantes} />
      </div>
    </div>
  );
}

export default VGestionEstudiante;