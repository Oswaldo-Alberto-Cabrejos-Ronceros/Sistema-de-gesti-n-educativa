import React, { useEffect, useState } from "react";
import DocenteService from "../../../services/docenteService";
import "./VGestionDocentes.css";
import TablaGestionDocentes from "./TablaGestionDocentes/TablaGestionDocentes";
import FormularioAgregarDocente from "./FormularioAgregarDocente/FormularioAgregarDocente";
import SearchComponent from "../../generalsComponets/SearchComponent/SearchComponent";
import SelectComponent from '../../generalsComponets/SelectComponent/SelectComponent';
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";

function VGestionDocentes() {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formularioIsVisible, setformularioIsVisible] = useState(false);

  // Estados para el nivel y el término de búsqueda
  const [nivel, setNivel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Función para alternar la visibilidad
  const toggleVisibility = () => {
    setformularioIsVisible(!formularioIsVisible);
  };

  useEffect(() => {
    fetchDocentes();
  }, [nivel, searchTerm]);

  const fetchDocentes = async () => {
    setLoading(true);
    setError(null);
    try {
      let response;
      if (searchTerm) {
        response = await DocenteService.buscarProfesorPorDNI(searchTerm);
      } else if (nivel) {
        response = await DocenteService.listarProfesoresPorNivel(nivel);
      } else {
        response = await DocenteService.getAllDocente();
      }
      setDocentes(response.data);
    } catch (error) {
      console.error("Error al cargar docentes:", error);
      setError("Error al cargar docentes. Inténtalo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocenteDeleted = (deletedId) => {
    setDocentes((prevDocentes) =>
      prevDocentes.filter((docente) => docente.usuarioId !== deletedId)
    );
  };

  const handleDocenteUpdated = (updatedDocente) => {
    setDocentes((prevDocentes) =>
      prevDocentes.map((docente) =>
        docente.usuarioId === updatedDocente.usuarioId ? updatedDocente : docente
      )
    );
  };

  const handleDocenteAdded = () => {
    fetchDocentes();
  };

  return (
    <div className="VGestionDocentesContainer">
      <div className="TitleGestionDocentes">
        <h3>Docentes</h3>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="FiltersAndSearch">
        <div>
        <div className="SearchGroup">
          <SearchComponent
            nombre={"Docentes"}
            placeholder={"Buscar por DNI"}
            onSearch={setSearchTerm}
          />
        </div>
        </div>

        <div className="FilterGroup">
          <label htmlFor="nivel-select">Nivel:</label>
          <SelectComponent
            name="nivel-select"
            value={nivel}
            onChange={(e) => setNivel(e.target.value)}
            options={[
              { value: '', label: 'Listar Todo' },
              { value: 'PRIMARIA', label: 'Primaria' },
              { value: 'SECUNDARIA', label: 'Secundaria' },
            ]}
          />
        </div>

      </div>

      {/* Mostrar mensaje de carga o error */}
      {loading ? (
        <div>Cargando docentes...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="VGestionDocentesContent">
          <TablaGestionDocentes
            docentes={docentes}
            onDocenteDeleted={handleDocenteDeleted}
            onDocenteUpdated={handleDocenteUpdated}
          />
          <div className="ButtonFormularioContent">
            <PrimaryButton
              nombre={formularioIsVisible ? "Ocultar" : "Mostrar"}
              onClick={toggleVisibility}
            />
          </div>
          {formularioIsVisible && (
            <FormularioAgregarDocente onDocenteAdded={handleDocenteAdded} />
          )}
        </div>
      )}
    </div>
  );
}

export default VGestionDocentes;
