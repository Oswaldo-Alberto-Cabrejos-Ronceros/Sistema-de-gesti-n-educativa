import React from 'react'
import './ButtonSubtmit.css'

function ButtonSubtmit({nombre}) {
  return (
    <div className="BtnSubmitContainer">
    <button type="submit" className="BtnSubmitContent">
      <span className="PSm">{nombre}</span>
    </button>
  </div>
  )
}

export default ButtonSubtmit