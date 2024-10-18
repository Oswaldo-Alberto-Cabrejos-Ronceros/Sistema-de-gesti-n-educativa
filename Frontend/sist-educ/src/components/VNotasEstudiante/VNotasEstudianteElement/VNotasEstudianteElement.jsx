import React from 'react'
import './VNotasEstudianteElement.css'
import TablaNotasEstudiante from '../../generalsComponets/TablaNotasEstudiante/TablaNotasEstudiante'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router-dom'

function VNotasEstudianteElement() {
    const location = useLocation();
    const {title}= location.state || {};
    const {tipo}=useParams();
    console.log(title);
    console.log(tipo);
    let notas=[
        {
            area:"Comunicacion",
            c1:18,
            c2:17,
            c3:16,
            c4:18,
            c5:16,
        },
        {
            area:"Matematica",
            c1:16,
            c2:15,
            c3:12,
            c4:"-",
            c5:"-",
        },
        {
            area:"Personal Social",
            c1:19,
            c2:15,
            c3:14,
            c4:"-",
            c5:18,
        },
        {
            area:"Religion",
            c1:18,
            c2:20,
            c3:"-",
            c4:"-",
            c5:"-",
        },

    ]
  return (
    <div className='VNotasEstudianteElementContainer'>
              <div className="TitleVNotasEstudianteElementContainer">
        <h3>{title}</h3>
      </div>
      <div className="VNotasEstudianteElementContent">
        <TablaNotasEstudiante notas={notas}/>
      </div>
    </div>
  )
}

export default VNotasEstudianteElement