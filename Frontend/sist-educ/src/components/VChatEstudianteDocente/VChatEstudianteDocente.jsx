import React from 'react'
import './VChatEstudianteDocente.css'
import CardChat from '../generalsComponets/CardChat/CardChat'

function VChatEstudianteDocente() {
  return (
    <div className='VChatEstudianteDocenteContainer'>
              <div className="VChatEstudianteDocenteTitleContainer">
        <h3>Chat</h3>
      </div>
      <div className='VChatEstudianteDocenteContent'>
      <CardChat/>
      </div>
    </div>
  )
}

export default VChatEstudianteDocente