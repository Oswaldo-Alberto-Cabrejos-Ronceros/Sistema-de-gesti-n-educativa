import React from "react";
import "./CardHonor.css";
import TablaHonor from "./TablaHonor/TablaHonor";

function CardHonor({ info, estudiantesHonor }) {
  let headerCardHonor = "";
  let conElementHeader = 0;
  info.map((element) => {
    headerCardHonor += element;
    conElementHeader++;
    if (conElementHeader < info.length) {
      headerCardHonor += " - ";
    }
  });

  
  return (
    <div className="CardHonorContainer">
      <div className="CardHonorHeaderContainer">
        <h3>{headerCardHonor}</h3>
      </div>
      <div className="CardHonorContent">
      <TablaHonor estudiantesHonor={estudiantesHonor}/>
      </div>
    </div>
  );
}

export default CardHonor;
