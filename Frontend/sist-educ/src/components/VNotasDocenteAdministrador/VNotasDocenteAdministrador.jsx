import React from "react";
import "./VNotasDocenteAdministrador.css";
import VNotasDocenteAdministradorCursos from "./VNotasDocenteAdministradorCursos/VNotasDocenteAdministradorCursos";

function VNotasDocenteAdministrador() {

  return (
    <div className="VNotasDocenteAdministradorContainer">
      <div className="VNotasDocenteAdministradorTitle">
        <h3>Notas</h3>
      </div>
      <div className="VNotDocAdminCamb">
      <VNotasDocenteAdministradorCursos />
      </div>
    </div>
  );
}

export default VNotasDocenteAdministrador;
