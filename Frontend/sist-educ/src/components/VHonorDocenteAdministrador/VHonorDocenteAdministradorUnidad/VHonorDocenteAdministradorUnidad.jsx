import React, { useState, useEffect } from "react";
import "./VHonorDocenteAdministradorUnidad.css";
import SelectComponent from "../../generalsComponets/SelectComponent/SelectComponent";
import CardHonor from "../../generalsComponets/CardHonor/CardHonor";
import alumnoService from "../../../services/alumnoService";

function VHonorDocenteAdministradorUnidad() {
  const [alumnos, setAlumnos] = useState([]);
  const [nivel, setNivel] = useState("PRIMARIA");
  const [grado, setGrado] = useState("1");
  let optionsNivel = [
    {
      value: "PRIMARIA",
      label: "Primaria",
    },
    {
      value: "SECUNDARIA",
      label: "Secundaria",
    },
  ];
  let optionsGradoPrimaria = [
    {
      value: 1,
      label: "1er Grado",
    },
    {
      value: 2,
      label: "2do Grado",
    },
    {
      value: 3,
      label: "3er Grado",
    },
    {
      value: 4,
      label: "2do Grado",
    },
    {
      value: 5,
      label: "5to Grado",
    },
    {
      value: 6,
      label: "6to Grado",
    },
  ];

  let optionsGradoSecundaria = [];
  for (let i = 1; i <= 5; i++) {
    optionsGradoSecundaria.push({
      value: i,
      label: `${i}º Año`,
    });
  }

  let optionsSeccion = ["A", "B"];

  //cambios en estados
  const handleNivelChange = (e) => {
    setNivel(e.target.value);
  };

  const handleGradoChange = (e) => {
    setGrado(e.target.value);
  };

  //peticion al backend
  useEffect(() => {
    alumnoService
      .listarAlumnosPorGradoNivelConMayorPromedio(grado, nivel)
      .then((response) => {
        setAlumnos(response.data); // Guarda los datos en el estado
      })
      .catch((error) => {
        console.error("Error al obtener los alumnos:", error);
      });
  }, [grado, nivel]);

  const capitalizeNivel=nivel==="PRIMARIA"?("Primaria"):("Secundaria")

  let info = [grado, capitalizeNivel];
  console.log(alumnos);
  return (
    <div className="VHonorDocenteAdministradorUnidadContainer">
      <div className="VHonorDocenteAdministradorUnidadTitleContainer">
        <h3>General</h3>
      </div>
      <div className="SelectHonorDocenteAdministradorUnidadContainer">
        <div className="FilterGroup">
          <label htmlFor="Nivel">Nivel:</label>
          <SelectComponent
            name={"Nivel"}
            options={optionsNivel}
            value={nivel}
            onChange={handleNivelChange}
          />
        </div>

        <div className="FilterGroup">
          <label htmlFor="Grado">Grado:</label>
          <SelectComponent
            name={"Grado"}
            options={
              nivel === "PRIMARIA"
                ? optionsGradoPrimaria
                : optionsGradoSecundaria
            }
            value={grado}
            onChange={handleGradoChange}
          />
        </div>

        <div className="FilterGroup">
          <label htmlFor="Seccion">Seccion:</label>
          <SelectComponent name={"Seccion"} options={optionsSeccion} />
        </div>
      </div>
      <div className="VHonorDocenteAdministradorUnidadContent">
        <CardHonor info={info} estudiantesHonor={alumnos} />
      </div>
    </div>
  );
}

export default VHonorDocenteAdministradorUnidad;
