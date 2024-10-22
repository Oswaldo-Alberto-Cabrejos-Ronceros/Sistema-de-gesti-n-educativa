import React from 'react'
import './VInformesDocenteAdministradorAuxiliar.css'
import SelectComponent from '../../generalsComponets/SelectComponent/SelectComponent';
import CardInformeDocenteAdministrador from '../../generalsComponets/CardInformeDocenteAdministrador/CardInformeDocenteAdministrador';


function VInformesDocenteAdministradorAuxiliar() {
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

  let optionsCursos=[
    "Matematicas",
    "Comunicación",
    "Inglés",
    "Personal Social",
    "Ciencia y Tecnología"
  ];
  let optionsUnidad = [
    "Unidad 1",
    "Unidad 2",
    "Unidad 3",
    "Unidad 4",
    "Unidad 5",
    "Unidad 6",
    "Unidad 7",
    "Unidad 8",
  ];

  let infoAuxiliar = ["Primaria", "6to", "Unica", "3era Unidad"];
  let estudiantesNotas = [
    {
      "N°": 1,
      Apellidos: "Rodriguez Pastor",
      Nombres: "Alberto Jorge",
      Promedio: 18.5,
    },
    {
      "N°": 2,
      Apellidos: "Yupa Mayuri",
      Nombres: "Karla Luisa",
      Promedio: 18.1,
    },
    {
      "N°": 3,
      Apellidos: "Cabrera Huanta",
      Nombres: "Xiomara Maria",
      Promedio: 17.8,
    },
  ];

  return (
    <div className='VInformesDocenteAdministradorAuxiliarContainer'>
      <div className='VInformesDocenteAdministradorAuxiliarTitleContainer'>
      <h3>Auxiliar</h3>
      </div>
      <div className='SelectInformesDocenteAdministradorAuxiliarContainer'> 
      <SelectComponent name={"Nivel"} options={optionsNivel}/>
      <SelectComponent name={"Grado"} options={optionsGrado}/>
      <SelectComponent name={"Seccion"} options={optionsSeccion}/>
      <SelectComponent name={"Cursos"} options={optionsCursos}/>
      <SelectComponent name={"Unidad"} options={optionsUnidad} />
      </div>
      <div className='VInformesDocenteAdministradorAuxiliarContent'>
      <CardInformeDocenteAdministrador info={infoAuxiliar} estudiantesNotas={estudiantesNotas}/>
      </div>
    </div>
  )
}

export default VInformesDocenteAdministradorAuxiliar