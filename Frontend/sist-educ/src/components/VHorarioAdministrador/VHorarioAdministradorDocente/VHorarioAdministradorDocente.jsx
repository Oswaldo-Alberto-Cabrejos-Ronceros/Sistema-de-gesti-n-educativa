import React from "react";
import './VHorarioAdministradorDocente.css'
import SearchComponent from "../../generalsComponets/SearchComponent/SearchComponent";
import CardHorario from "../../generalsComponets/CardHorario/CardHorario";
import CardFormularioHorarioDocente from "../../generalsComponets/CardFormularioHorarioDocente/CardFormularioHorarioDocente";

function VHorarioAdministradorDocente() {
  let docentes=[
    {
      apellidos:"Maurtua Andrade",
      nombres:"Carlos Alberto"
    },
    {
      apellidos:"Rojas Rodriguez",
      nombres:"Ruth Meliza"
    },
  ]
  return (
    <div className="VHorarioAdministradorDocenteContainer">
      <div className="VHorarioAdministradorDocenteTitleContainer">
        <h3>Docente</h3>
      </div>
      <div className="SearchHorarioAdministradorDocenteContainer">
        <SearchComponent nombre={"Docente"} placeholder={"Buscar Docente"} />
      </div>
      <div className="VHorarioAdministradorDocenteContent">
        {
          docentes.map((docente,index)=>(
            <CardHorario key={index} grado={docente.apellidos} nivel={docente.nombres}/>
          ))
        }
        <CardFormularioHorarioDocente/>
      </div>
    </div>
  );
}

export default VHorarioAdministradorDocente;
