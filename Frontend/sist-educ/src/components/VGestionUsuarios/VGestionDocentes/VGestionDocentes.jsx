import React from "react";
import "./VGestionDocentes.css";
import PrimaryButton from "../../generalsComponets/PrimaryButton/PrimaryButton";
import TablaGestionDocentes from "./TablaGestionDocentes/TablaGestionDocentes";
import FormularioAgregarDocente from "./FormularioAgregarDocente/FormularioAgregarDocente";

function VGestionDocentes({ docentes }) {
  let fAgregardocente = function () {
    alert("Presionando AgregarDocente");
  };
  return (
    <div className="VGestionDocentesContainer">
      <div className="TitleGestionDocentes">
        <h3>Gestion de Docentes:</h3>
      </div>
      <div className="VGestionDocentesContent">
        <div>
          <TablaGestionDocentes docentes={docentes} />
        </div>
        <div className="ButtonAgregarDocente">
          <PrimaryButton onClick={fAgregardocente} nombre={"Agregar Docente"} />
        </div>
        <FormularioAgregarDocente />
      </div>
    </div>
  );
}

export default VGestionDocentes;
