import React from 'react'
import './VDocente.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'

function VDocente() {
  return (
    <BrowserRouter>
    <div className='VDocenteMain'>
    {/*agregar barra de navegacion*/ }
    <div className='containerCamb'>
      <Routes>

      </Routes>
    </div>
    </div>
    </BrowserRouter>
  )
}

export default VDocente