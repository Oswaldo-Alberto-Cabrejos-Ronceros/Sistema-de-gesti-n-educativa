import React from 'react'
import './TextAreaComponent.css'

function TextAreaComponent({nombre,placeholder,icon, value, onChange}) {
  return (
    <div className='TextAreaComponentContainer'>
        <div className='IconTextAreaContainer'>
            {icon}
        </div>
        <textarea name={nombre} id={nombre} placeholder={placeholder} rows="3" cols="50" value={value} onChange={onChange}></textarea>
    </div>
  )
}

export default TextAreaComponent