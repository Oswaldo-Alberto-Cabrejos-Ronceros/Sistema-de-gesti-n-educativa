import React, { useEffect, useState } from "react";
import DocenteService from "../../../services/docenteService";
import "./CardFormularioHorarioDocente.css";
import TablaGestionHorariosDocentes from "../TablaGestionHorariosDocentes/TablaGestionHorariosDocentes";
import SearchComponent from "../../generalsComponets/SearchComponent/SearchComponent";
import SelectComponent from '../../generalsComponets/SelectComponent/SelectComponent';


function CardFormularioHorarioDocente({ onHorarioAgregado }) {
  const [docentes, setDocentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para el nivel y el término de búsqueda
  const [nivel, setNivel] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

 
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

 

  return (
    <div className="CardFormularioHorarioDocenteContainer">
      <div className="CardFormularioHorarioDocenteTitleContainer">
        <h3>Subir Horario Docente</h3>
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
        <div className="CardFormularioHorarioDocenteContent">
          <TablaGestionHorariosDocentes onHorarioAgregado={
            onHorarioAgregado
          }
            docentes={docentes}
          />
        </div>
      )}
    </div>
  );
}

export default CardFormularioHorarioDocente;
