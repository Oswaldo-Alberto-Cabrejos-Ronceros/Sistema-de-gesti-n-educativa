import React from "react";
import './TablaSubirNotasDocenteAdministrador.css'

function TablaSubirNotasDocenteAdministrador({alumnos,competencias}) {

  const indexAlumnos = alumnos.length > 0 ? Object.keys(alumnos[0]) : [];
  const ths=[...indexAlumnos,...competencias];
  
  return (
    <div className="TablaNotasInputContainer">
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
    </div>
  );
}

export default TablaSubirNotasDocenteAdministrador;
