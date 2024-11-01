import React from 'react'
import './VInformesDocenteAdministrador.css'
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import PrimaryButton from '../generalsComponets/PrimaryButton/PrimaryButton';
import VInformesDocenteAdministradorAuxiliar from './VInformesDocenteAdministradorAuxiliar/VInformesDocenteAdministradorAuxiliar'
import VInformesDocenteAdministradorBimestral from './VInformesDocenteAdministradorBimestral/VInformesDocenteAdministradorBimestral'

function VInformesDocenteAdministrador() {
  return (
    <div className='VInformesDocenteAdministradorContainer' >
        <div className='VInformesDocenteAdministradorTitleContainer'>
            <h3>Informes</h3>
        </div>
        <div className='VInformesDocenteAdministradorButtonsContainer'>
            <Link className='LinkVInformesDocenteAdministrador' to="auxiliar">
            <PrimaryButton nombre="Auxiliar"/>
            </Link>
            <Link className='LinkVInformesDocenteAdministrador' to="bimestral">
            <PrimaryButton nombre="Bimestral"/>
            </Link>
        </div>
        <div className='CambVInformesDocenteAdministrador'>
            <Routes>
                <Route index element ={<Navigate to={"auxiliar"}/>}/>
                <Route path='auxiliar' element={<VInformesDocenteAdministradorAuxiliar/>}/>
                <Route path='bimestral' element={<VInformesDocenteAdministradorBimestral/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default VInformesDocenteAdministrador