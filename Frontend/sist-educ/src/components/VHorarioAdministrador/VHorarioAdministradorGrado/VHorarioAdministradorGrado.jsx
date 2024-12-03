import React, { useState,useEffect } from "react";
import "./VHorarioAdministradorGrado.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardHorario from "../../generalsComponets/CardHorario/CardHorario";
import CardFormularioHorarioGrado from "../../generalsComponets/CardFormularioHorarioGrado/CardFormularioHorarioGrado";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import horarioService from "../../../services/horarioService";

function VHorarioAdministradorGrado() {
  const [formularioIsVisible, setformularioIsVisible] = useState(false);
  const [nivel, setNivel] = useState("");
  const [grado, setGrado] = useState("");
  const [horarios, setHorarios] = useState([]); 

  const secciones=["A","B"];

  // Función para alternar la visibilidad
  const toggleVisibility = () => {
    setformularioIsVisible(!formularioIsVisible);
  };

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const resultados = await Promise.all(
          secciones.map(async (seccion) => {
            try {
              const response = await horarioService.obtenerHorarioAlumno(nivel, grado, seccion);
              if (response.data && response.data.urlArchivo) {
                return {
                  nivel,
                  grado,
                  seccion,
                  urlHorario: response.data.urlArchivo,
                };
              } else {
                return {
                  nivel,
                  grado,
                  seccion,
                  urlHorario: "",
                };
              }
            } catch (error) {
              console.error(`Error al obtener horario para la sección ${seccion}:`, error);
              return {
                nivel,
                grado,
                seccion,
                urlHorario: "", 
              };
            }
          })
        );
        setHorarios(resultados);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };
  
    fetchHorarios();
  }, [nivel, grado,horarios]);

  const getGradoOptions = () => {
    if (nivel === "PRIMARIA") {
      return [1, 2, 3, 4, 5, 6];
    } else if (nivel === "SECUNDARIA") {
      return [1, 2, 3, 4, 5];
    } else {
      return [];
    }
  };


  const optionsGradoPrimaria = [
    { label: "Seleccionar grado", value: "SELECCIONAR" },
    { label: "1er Grado", value: 1 },
    { label: "2do Grado", value: 2 },
    { label: "3er Grado", value: 3 },
    { label: "4to Grado", value: 4 },
    { label: "5to Grado", value: 5 },
    { label: "6to Grado", value: 6 },
  ];
  const optionsGradoSecundaria = [
    { label: "Seleccionar año", value: "SELECCIONAR" },
    { label: "1er Año", value: 1 },
    { label: "2do Año", value: 2 },
    { label: "3er Año", value: 3 },
    { label: "4to Año", value: 4 },
    { label: "5to Año", value: 5 },
  ];
  const agregarHorario = (nuevoHorario) => {
    setHorarios((prevHorarios) => [...prevHorarios, nuevoHorario]);
  };
  return (
    <div className="VHorarioAdministradorGradoContainer">
      <div className="VHorarioAdministradorGradoTitleContainer">
        <h3>Grado</h3>
      </div>
      <div className="SelectHorarioAdministradorGradoGeneralContainer">
        <div className="SelectHorarioAdministradorGradoContainer">
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
                { value: "", label: "Seleccionar Nivel" },
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
              options={
                nivel === "PRIMARIA"
                  ? optionsGradoPrimaria
                  : optionsGradoSecundaria
              }
              disabled={!nivel}
            />
          </div>
        </div>
      </div>
      <div className="VHorarioAdministradorGradoContent">
        {
          (nivel==="" || grado==="")?(
            <h3>Seleccione un nivel y grado</h3>
          ):(horarios.map((horario, index) => (
            <CardHorario
              key={index}
              grado={horario.grado + " " + horario.seccion}
              nivel={horario.nivel}
              url={horario.urlHorario}
            />
          )))
        }
        <div className="ButtonFormularioContent">
          <PrimaryButton
            nombre={formularioIsVisible ? "Ocultar" : "Mostrar"}
            onClick={toggleVisibility}
          />
        </div>
        {formularioIsVisible && <CardFormularioHorarioGrado onAgregarHorario={agregarHorario}/>}
      </div>
    </div>
  );
}

export default VHorarioAdministradorGrado;
