import React from 'react'
import './PrimaryButtonLarge.css'

function PrimaryButtonLarge({onClick, nombre}) {
  return (
    <div className='PrimaryButtonLargeContainer'>
        <button type='submit' className="BtnPrimaryLargeContent" onClick={onClick}><span className="PMd">{nombre}</span></button>
    </div>
  )
}

export default PrimaryButtonLarge