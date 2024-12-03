import React, { useEffect, useState } from "react";
import AlumnoService from "../../../services/alumnoService";
import "./VGestionEstudiante.css";
import TablaGestionEstudiantes from "./TablaGestionEstudiantes/TablaGestionEstudiantes";
import FormularioAgregarEstudiante from "./FormularioAgregarEstudiante/FormularioAgregarEstudiante";
import SearchComponent from "../../generalsComponets/SearchComponent/SearchComponent";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";

function VGestionEstudiante() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formularioIsVisible, setFormularioIsVisible] = useState(false);
  const [error, setError] = useState(null);

  // Estados para los filtros
  const [nivel, setNivel] = useState("PRIMARIA");
  const [grado, setGrado] = useState("1");
  const [seccion, setSeccion] = useState("");

  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  const toggleVisibility = () => {
    setFormularioIsVisible(!formularioIsVisible);
  };

  // Cargar estudiantes al montar el componente y cuando los filtros o el término de búsqueda cambian
  useEffect(() => {
    fetchEstudiantes();
  }, [nivel, grado, seccion, searchTerm]);

  const fetchEstudiantes = async () => {
    setLoading(true);
    setError(null);
    try {
      if (searchTerm) {
        const response = await AlumnoService.buscarAlumnosPorDNI(searchTerm);
        setEstudiantes(response.data);
      } else if (!nivel && !grado && !seccion) {
        // Si no hay filtros, cargar todos los alumnos
        const response = await AlumnoService.getAllAlumno();
        setEstudiantes(response.data);
      } else {
        // Aplicar filtros
        const response = await AlumnoService.buscarAlumnos(
          nivel,
          grado,
          seccion
        );
        setEstudiantes(response.data);
      }
    } catch (error) {
      console.error("Error al cargar estudiantes:", error);
      if (error.response && error.response.status === 404) {
        setEstudiantes([]); // Asegurarse de que la lista esté vacía
      } else {
        setError("Error al cargar estudiantes. Inténtalo más tarde.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStudentDeleted = (deletedId) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.filter((estudiante) => estudiante.usuarioId !== deletedId)
    );
  };

  const handleStudentUpdated = (updatedStudent) => {
    setEstudiantes((prevEstudiantes) =>
      prevEstudiantes.map((estudiante) =>
        estudiante.usuarioId === updatedStudent.usuarioId
          ? updatedStudent
          : estudiante
      )
    );
  };

  const handleStudentAdded = () => {
    fetchEstudiantes();
  };

  const getGradoOptions = () => {
    if (nivel === "PRIMARIA") {
      return [1, 2, 3, 4, 5, 6];
    } else if (nivel === "SECUNDARIA") {
      return [1, 2, 3, 4, 5];
    } else {
      return [];
    }
  };

  return (
    <div className="VGestionEstudianteContainer">
      <div className="TitleGestionEstudiante">
        <h3>Estudiantes</h3>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="FiltersAndSearch">
        {/* Componente de búsqueda */}
        <div className="FilterGroup">
        <div className="SearchGroup">
          <SearchComponent
            nombre={"Cursos"}
            placeholder={"Buscar DNI"}
            onSearch={setSearchTerm}
          />
        </div>
        </div>
        <div className="FilterGroup">
          <label htmlFor="nivel-select">Nivel:</label>
          <SelectComponent
            name="nivel-select"
            value={nivel}
            onChange={(e) => {
              setNivel(e.target.value);
              setGrado("");
            }}
            options={[
              { value: "PRIMARIA", label: "Primaria" },
              { value: "SECUNDARIA", label: "Secundaria" },
            ]}
          />
        </div>

        <div className="FilterGroup">
          <label htmlFor="grado-select">Grado:</label>
          <SelectComponent
            name="grado-select"
            value={grado}
            onChange={(e) => setGrado(e.target.value)}
            options={[
              ...getGradoOptions().map((g) => ({
                value: g,
                label: g.toString(),
              })),
            ]}
            disabled={!nivel}
          />
        </div>

        <div className="FilterGroup">
          <label htmlFor="seccion-select">Sección:</label>
          <SelectComponent
            name="seccion-select"
            value={seccion}
            onChange={(e) => setSeccion(e.target.value)}
            options={[
              { value: "", label: "Seleccionar Sección" },
              { value: "A", label: "A" },
              { value: "B", label: "B" },
            ]}
          />
        </div>
      </div>

      {/* Mostrar mensaje de error si existe */}
      {error && <div className="ErrorMessage">{error}</div>}

      {/* Mostrar indicador de carga */}
      {loading ? (
        <div>Cargando estudiantes...</div>
      ) : (
        
        /* Tabla de estudiantes */
        <div className="VGestionEstudiantesContent">
          <TablaGestionEstudiantes
            estudiantes={estudiantes}
            onStudentDeleted={handleStudentDeleted}
            onStudentUpdated={handleStudentUpdated}
          />
          <div className="ButtonFormularioContent">
            <PrimaryButton
              nombre={formularioIsVisible ? "Ocultar" : "Mostrar"}
              onClick={toggleVisibility}
            />
          </div>
          {formularioIsVisible && (
            <FormularioAgregarEstudiante onStudentAdded={handleStudentAdded} />
          )}
        </div>
      )}
    </div>
  );
}

export default VGestionEstudiante;
