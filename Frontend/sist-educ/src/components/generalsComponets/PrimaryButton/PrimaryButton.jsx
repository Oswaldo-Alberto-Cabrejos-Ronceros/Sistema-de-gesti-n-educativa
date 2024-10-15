import React from "react";
import './PrimaryButton.css'

function PrimaryButton({onClick, nombre}) {
  return (
    <div className="BtnPrimaryContainer">
      <button className="BtnPrimaryContent" onClick={onClick}><span className="PSm">{nombre}</span></button>
    </div>
  );
}

export default PrimaryButton;
