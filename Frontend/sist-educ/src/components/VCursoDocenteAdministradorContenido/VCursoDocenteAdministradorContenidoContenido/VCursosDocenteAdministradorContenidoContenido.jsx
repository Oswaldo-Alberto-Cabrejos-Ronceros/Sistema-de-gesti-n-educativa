import React from "react";
import "./VCursosDocenteAdministradorContenidoContenido.css";
import ComBoxCursoXUnidadDocente from "../../generalsComponets/ComBoxCursoXUnidadDocente/ComBoxCursoXUnidadDocente";


function VCursosDocenteAdministradorContenidoContenido({to,curso, contenidos }) {
  let unidad = "Unidad ";
  let numerounidad = 1;
  let unidadString;
  return (
    <div className="VCursoDocenteContenidoContenidoContainer">
      {contenidos.map((contenido) => {
        unidadString = unidad + numerounidad;
        numerounidad++;
        return (
          <ComBoxCursoXUnidadDocente
            unidad={unidadString}
            contenidos={contenido}
            curso={curso}
            to={to}
          />
        );
      })}
    </div>
  );
}

export default VCursosDocenteAdministradorContenidoContenido;
