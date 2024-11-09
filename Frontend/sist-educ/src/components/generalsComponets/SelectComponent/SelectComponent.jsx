
import React from 'react'
import './SelectComponent.css'

function SelectComponent({ name, options, value, onChange, disabledOptions = [] }) {
  return (
    <div className="SelectComponentContainer">
      <select name={name} id={name} value={value} onChange={onChange}>
        {options.map((option, index) => {
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;
          const isDisabled = disabledOptions[index] === true; 

          return (
            <option key={optionValue} value={optionValue} disabled={isDisabled}>
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default SelectComponent;