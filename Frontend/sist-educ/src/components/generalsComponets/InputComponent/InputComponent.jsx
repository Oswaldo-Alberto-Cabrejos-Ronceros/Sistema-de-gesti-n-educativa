import React from 'react'
import './InputComponent.css'

function InputComponent({ nombre, placeholder, icon, type, value, onChange, disable }) {
  return (
    <div className="InputComponentContainer">
      <div className="IconInputContainer">{icon}</div>
      <input
        type={type}
        name={nombre} // Cambiado a nombre
        id={nombre} // Cambiado a nombre
        placeholder={placeholder}
        required
        value={value} // Asegúrate de que reciba el valor del padre
        onChange={onChange} // onChange directamente del padre
        disabled={disable}
      />
    </div>
  );
}

export default InputComponent;