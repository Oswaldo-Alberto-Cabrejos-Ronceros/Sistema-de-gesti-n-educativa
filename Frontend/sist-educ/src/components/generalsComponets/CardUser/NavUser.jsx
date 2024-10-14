import React from 'react'
import './NavUser.css'

function NavUser({ nombre, imagen}) {
  return (
    <div className='NavUserContainer'> 
    <img className='ImgUser' src={imagen} alt="Imagen de Usuario" />
        <p className='PLg'>{nombre}</p>
    </div>
  )
}

export default NavUser