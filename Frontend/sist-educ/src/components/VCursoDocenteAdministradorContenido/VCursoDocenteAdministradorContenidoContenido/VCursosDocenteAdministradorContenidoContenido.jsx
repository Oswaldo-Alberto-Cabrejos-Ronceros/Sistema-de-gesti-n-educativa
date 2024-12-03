import React from "react";
import "./VCursosDocenteAdministradorContenidoContenido.css";
import ComBoxCursoXUnidadDocente from "../../generalsComponets/ComBoxCursoXUnidadDocente/ComBoxCursoXUnidadDocente";


function VCursosDocenteAdministradorContenidoContenido({to,toTarea,curso }) {
  let unidadString = "Unidad ";
  const unidades=[1,2,3,4,5,6,7,8];
  return (
    <div className="VCursoDocenteContenidoContenidoContainer">
      {unidades.map((unidad) => {
        return (
          <ComBoxCursoXUnidadDocente
            unidad={unidadString + unidad}
            curso={curso}
            to={to}
            toTarea={toTarea}
            unidadNumero={unidad}
          />
        );
      })}
    </div>
  );
}

export default VCursosDocenteAdministradorContenidoContenido;
