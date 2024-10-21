import React from 'react'
import './VNotasDocenteAdministrador.css'
import CardCursoNotasDocente from './CardCursoNotasDocenteAdministrador/CardCursoNotasDocenteAdministrador';
import SelectComponent from '../generalsComponets/SelectComponent/SelectComponent';

function VNotasDocenteAdministrador() {
  let cursos =[
    {
      name:"Matematica",
      grado: "6to",
      seccion:"Unica",
      nivel:"Primaria"
    },
    {
      name:"Comunicacion",
      grado: "6to",
      seccion:"Unica",
      nivel:"Primaria"
    }
  ];
  let optionsNivel=[
    "Primaria",
    "Secundaria"
  ];
  let optionsGrado=[
    "1er Grado",
    "2do Grado",
    "3er Grado",
    "4to Grado",
    "5to Grado",
    "6to Grado"
  ];
  let optionsSeccion=[
    "Unica",
    "A",
    "B"
  ];
  return (
    <div className='VNotasDocenteAdministradorContainer'>
            <div className="VNotasDocenteAdministradorTitle">
        <h3>Notas</h3>
      </div>
      <div className='SelectNotasDocenteAdministradorContainer'>
      <SelectComponent name={"Nivel"} options={optionsNivel}/>
        <SelectComponent name={"Grado"} options={optionsGrado} />
        <SelectComponent name={"Seccion"} options={optionsSeccion}/>
      </div>
        <div className='VNotasDocenteAdministradorContent'>
          {
            cursos.map((curso, index)=>(
              <CardCursoNotasDocente key={index} curso={curso}/>
            ))
          }
        </div>
    </div>
  )
}

export default VNotasDocenteAdministrador