import React from 'react'
import './SearchComponent.css'
import { IoSearch } from "react-icons/io5";

function SearchComponent({nombre,placeholder}) {
  return (
    <div className='SearchComponentContainer'>
        <div className='IconSearchContainer'>
        <IoSearch/>
        </div>
        <input type="text" name={nombre} id={nombre} placeholder={placeholder}/>
    </div>
  )
}

export default SearchComponent