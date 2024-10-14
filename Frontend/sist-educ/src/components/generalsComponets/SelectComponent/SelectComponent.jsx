import React from 'react'
import './SelectComponent.css'

function SelectComponent({name,options}) {
  return (
    <div className='SelectComponentContainer'>
        <select name={name} id={name}>
            {
                options.map((option)=>{
                    return <option value={option}>{option}</option>
                })
            }
        </select>
    </div>
  )
}

export default SelectComponent