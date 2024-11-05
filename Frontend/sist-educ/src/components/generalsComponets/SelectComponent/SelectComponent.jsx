import React from 'react'
import './SelectComponent.css'

function SelectComponent({ name, options, value, onChange }) {
  return (
    <div className="SelectComponentContainer">
      <select name={name} id={name} value={value} onChange={onChange}>
        {options.map((option) => {
          
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;

          return (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectComponent;
