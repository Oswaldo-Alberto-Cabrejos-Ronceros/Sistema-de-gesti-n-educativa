import React from "react";
import './TablaSubirNotasDocenteAdministrador.css'
import ButtonSubtmit from "../../../generalsComponets/ButtonSubmit/ButtonSubtmit";

function TablaSubirNotasDocenteAdministrador({alumnos,competencias}) {

  const indexAlumnos = alumnos.length > 0 ? Object.keys(alumnos[0]) : [];
  const ths=[...indexAlumnos,...competencias];
  
  return (
    <div className="TablaNotasInputContainer">
      <form action="">
      <table className="TableInputNotas">
        <thead>
        {ths.map((item) => {
          return <th>{item}</th>;
        })}
        </thead>
          <tbody>
            {
              alumnos.map((item,index)=>(
                <tr key={index} >
                  {
                    indexAlumnos.map(
                      column=>(
                        <td  key={`${index}-${column}`}> {item[column]}</td>
                      )
                    )
                  }
                  {
                    competencias.map(
                      column=>(
                        <td key={column} className="Tdcomp" > <input type="number" min={0} max={20} required/></td>
                      )
                    )
                  }
                </tr>
              )

              )
            }
          </tbody>
      </table>
      <div className="ButtonSubmitSubirNotasDocAdmContainer">
      <ButtonSubtmit nombre={"Subir Notas "}/>
      </div>
      </form>
    </div>
  );
}

export default TablaSubirNotasDocenteAdministrador;
