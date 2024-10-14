import React from "react";
import CardCursoDocente from "../generalsComponets/CardCursoDocente/CardCursoDocente";
import "./VCursosAdministrador.css";

function VCursosAdministrador({ cursos }) {
  let niveles = ["Primaria", "Secundaria"];
  let gradPrim=["1er Grado","2do Grado","3er Grado","4to Grado","5to Grado","6to Grado"];
  let gradSec=["1er año","2do año","3er año","4to año","5 año"];
  return (
    <div className="VCursosAdministradorContainer">
      <div className="VCursosAdminTitle">
        <h3>Cursos:</h3>
      </div>
      <div className="VCursosAdminFilters">
        <label htmlFor="Nivel">Nivel:</label>
        <select name="Nivel" id="Nivel">
        {
          niveles.map((nivel)=>
            <option value={nivel}>{nivel}</option>
          )
        }
        </select>

        <label htmlFor="Grado">Grado</label>
        <select name="Grado" id="Grado"></select>
      </div>
      {
          cursos.map((curso)=>{
            return <CardCursoDocente curso={curso}/>
          })
        }
    </div>
  );
}

export default VCursosAdministrador;
