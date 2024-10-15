import React from "react";
import { NavLink } from 'react-router-dom';
import './NavItem.css'


function NavItem({ id, titulo, icon, to}) {
  return (
    <NavLink  to={to} className={({ isActive }) =>
      `NavItemContainer ${isActive ? 'active' : ''}`
    } id={id} >
      <div className="IconContainer">
        {icon}
      </div>
      <p className="PMd">{titulo}</p>
    </NavLink >
  );
}

export default NavItem;
