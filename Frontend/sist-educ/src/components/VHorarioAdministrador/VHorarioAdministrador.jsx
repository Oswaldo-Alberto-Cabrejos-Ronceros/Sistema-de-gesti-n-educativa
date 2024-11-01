import React from 'react'
import './VHorarioAdministrador.css'
import PrimaryButton from '../generalsComponets/PrimaryButton/PrimaryButton';
import VHorarioAdministradorGrado from './VHorarioAdministradorGrado/VHorarioAdministradorGrado';
import VHorarioAdministradorDocente from './VHorarioAdministradorDocente/VHorarioAdministradorDocente';
import { Routes, Route, Link, Navigate } from 'react-router-dom';

function VHorarioAdministrador() {
  return (
    <div className='VHorarioAdministradorContainer'>
      <div className="VHorarioAdministradorTitleContainer">
        <h3>Horario</h3>
      </div>
      <div className="VHorarioAdministradorButtonsContainer">
        <Link className="LinkVHorarioAdministrador" to="grado">
        <PrimaryButton nombre={"Grado"}/>
        </Link>
        <Link className="LinkVHorarioAdministrador" to="docente">
        <PrimaryButton nombre={"Docente"}/>
        </Link>
      </div>
      <div className="CambVHorarioAdministrador">
        <Routes>
          <Route index element={<Navigate to={"grado"}/>} />
          <Route path="grado" element={<VHorarioAdministradorGrado/>}/>
          <Route path="docente" element={<VHorarioAdministradorDocente/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default VHorarioAdministrador