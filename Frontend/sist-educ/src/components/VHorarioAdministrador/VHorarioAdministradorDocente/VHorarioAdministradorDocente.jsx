import React, { useState, useEffect } from "react";
import "./VHorarioAdministradorDocente.css";
import SearchComponent from "../../generalsComponets/SearchComponent/SearchComponent";
import CardHorario from "../../generalsComponets/CardHorario/CardHorario";
import CardFormularioHorarioDocente from "../../generalsComponets/CardFormularioHorarioDocente/CardFormularioHorarioDocente";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import DocenteService from "../../../services/docenteService";
import horarioService from "../../../services/horarioService";

function VHorarioAdministradorDocente() {
  const [formularioIsVisible, setformularioIsVisible] = useState(false);
  const [docentes, setDocentes] = useState([]);
  // Estados para el nivel y el término de búsqueda
  const [nivel, setNivel] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setDocentes([]);
        return;
      }

      const docentesConHorario = await Promise.all(
        response.data.map(async (docente) => {
          try {
            const horarioResponse = await horarioService.obtenerHorarioProfesor(
              docente.usuarioId
            );
            return {
              ...docente,
              urlHorario: horarioResponse.data.urlArchivo,
            };
          } catch {
            console.error(
              `Error al obtener el horario para el docente ${docente.usuarioId}:`,
              error
            );
            return {
              ...docente,
              urlHorario: "",
            };
          }
        })
      );
      setDocentes(docentesConHorario);
    } catch (error) {
      console.error("Error al cargar docentes:", error);
      setError("Error al cargar docentes. Inténtalo más tarde.");
      setDocentes([]);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="VHorarioAdministradorDocenteContainer">
      <div className="VHorarioAdministradorDocenteTitleContainer">
        <h3>Docente</h3>
      </div>
      <div className="SearchHorarioAdministradorDocenteContainer">
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
              { value: "", label: "Seleccionar" },
              { value: "PRIMARIA", label: "Primaria" },
              { value: "SECUNDARIA", label: "Secundaria" },
            ]}
          />
        </div>
      </div>
      <div className="VHorarioAdministradorDocenteContent">
        {nivel === "" && searchTerm === "" ? (
          <h3>Busque un docente o seleccione un nivel</h3>
        ) : loading ? (
          <div>Cargando horarios...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          docentes.map((docente, index) => (
            <CardHorario
              key={index}
              grado={docente.dni + " " + docente.apellido}
              nivel={docente.nombre + " " + docente.nivel}
              url={docente.urlHorario}
            />
          ))
        )}
        <div className="ButtonFormularioContent">
          <PrimaryButton
            nombre={formularioIsVisible ? "Ocultar" : "Mostrar"}
            onClick={toggleVisibility}
          />
        </div>
        {formularioIsVisible && <CardFormularioHorarioDocente />}
      </div>
    </div>
  );
}

export default VHorarioAdministradorDocente;
