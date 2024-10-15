import React from 'react'
import './VHonerEstudianteBimestral.css'
import SelectComponent from '../../generalsComponets/SelectComponent/SelectComponent';
import CardHonor from '../../generalsComponets/CardHonor/CardHonor'

function VHonorEstudianteBimestral({info, estudiantesHonor}) {
    let optionsBimestre = [
        "Bimestre 1",
        "Bimestre 2",
        "Bimestre 3",
        "Bimestre 4",
      ];
  return (
    <div className='VHonorEstudianteBimestralContainer'>
              <div className="TitleHonorEstudianteBimestralContainer">
        <h3>Bimestral</h3>
      </div>
      <div className="SelectBimestralHonorEstudianteContainer">
        <SelectComponent name={"Bimestre"} options={optionsBimestre} />
      </div>
      <div className="VHonorEstudianteBimestralContent">
        <CardHonor info={info} estudiantesHonor={estudiantesHonor}/>
      </div>
    </div>
  )
}

export default VHonorEstudianteBimestral