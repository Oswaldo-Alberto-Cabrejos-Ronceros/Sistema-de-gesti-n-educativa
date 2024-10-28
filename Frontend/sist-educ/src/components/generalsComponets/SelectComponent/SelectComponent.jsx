import React from 'react'
import './SelectComponent.css'

function SelectComponent({ name, options, value, onChange }) {
  return (
    <div className="SelectComponentContainer">
      <select name={name} id={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectComponent;