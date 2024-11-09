import React from "react";
import "./VNotasEstudianteUnidad.css";
import ComponentNotasEstudianteElement from "../../generalsComponets/ComponentNotasEstudianteElement/ComponentNotasEstudianteElement";

function VNotasEstudanteUnidad() {
  const unidades = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="VNotasEstudanteUnidadContainer">
      {unidades.map((unidad) => (
        <ComponentNotasEstudianteElement
          title={"Unidad " + unidad}
          tipo={"unidad"}
          indicador={unidad}
        />
      ))}
    </div>
  );
}

export default VNotasEstudanteUnidad;
