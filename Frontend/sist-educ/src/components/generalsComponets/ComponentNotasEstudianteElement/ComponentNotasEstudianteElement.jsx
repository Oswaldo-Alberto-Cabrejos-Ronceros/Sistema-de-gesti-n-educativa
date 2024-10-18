import React from 'react'
import './ComponentNotasEstudianteElement.css'

function ComponentNotasEstudianteElement({title}) {
  return (
    <div className='ComponentNotasEstudianteElementContainer'>
              <div className="ComponentNotasEstudianteElementContent">
        <p className="PLg">{title}</p>
      </div>
    </div>
  )
}

export default ComponentNotasEstudianteElement