import React, { useState } from 'react';
import './SearchComponent.css'
import { IoSearch } from "react-icons/io5";

function SearchComponent({ nombre, placeholder, onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    let value = e.target.value;

    // Eliminar cualquier carácter que no sea un dígito
    value = value.replace(/\D/g, '');

    // Limitar a 8 caracteres
    if (value.length > 8) {
      value = value.slice(0, 8);
    }

    setInputValue(value);
    onSearch(value);
  };

  return (
    <div className='SearchComponentContainer'>
      <div className='IconSearchContainer'>
        <IoSearch />
      </div>
      <input
        type="text"
        name={nombre}
        id={nombre}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        maxLength="8"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </div>
  );
}

export default SearchComponent;