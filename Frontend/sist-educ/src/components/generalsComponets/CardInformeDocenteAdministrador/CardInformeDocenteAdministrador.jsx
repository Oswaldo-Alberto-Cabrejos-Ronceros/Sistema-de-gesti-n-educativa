import React from 'react'
import './CardInformeDocenteAdministrador.css'
import TablaVerNotasDocenteAdministrador from '../TablaVerNotasDocenteAdministrador/TablaVerNotasDocenteAdministrador';
import PrimaryButton from '../PrimaryButton/PrimaryButton';

function CardInformeDocenteAdministrador({info, estudiantesNotas}) {
    let headerCardInforme = "";
    let conElementHeader = 0;
    info.map((element) => {
        headerCardInforme += element;
      conElementHeader++;
      if (conElementHeader < info.length) {
        headerCardInforme += " - ";
      }
    });
  return (
    <div className='CardInformeDocenteAdministradorContainer'>
        <div className='CardInformeDocenteAdministradorHeaderContainer'>
        <h3>{headerCardInforme}</h3>
        </div>
        <div className='CardInformeDocenteAdministradorContent'>
            <TablaVerNotasDocenteAdministrador estudiantesNotas={estudiantesNotas}/>
        </div>
        <div className='CardInformeDocenteAdministradorButtonContainer'>
        <PrimaryButton nombre={"Descargar"}/>
        </div>
    </div>
  )
}

export default CardInformeDocenteAdministrador