import React from 'react'
import './InputComponent.css'


function InputComponent({nombre,placeholder,icon,type}) {
  return (
    <div className='InputComponentContainer'>
      <div className='IconInputContainer'>
      {icon}
      </div>
      <input type={type} name={nombre} id={nombre} placeholder={placeholder} required/>
    </div>
  )
}

export default InputComponent