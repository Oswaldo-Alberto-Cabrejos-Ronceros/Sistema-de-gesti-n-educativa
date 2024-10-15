import React from "react";
import "./CardHonor.css";
import TablaHonor from "./TablaHonor/TablaHonor";

function CardAuxiliar({ info, estudiantesHonor }) {
  let headerCardAuxiliar = "";
  let conElementHeader = 0;
  info.map((element) => {
    headerCardAuxiliar += element;
    conElementHeader++;
    if (conElementHeader < info.length) {
      headerCardAuxiliar += " - ";
    }
  });

  return (
    <div className="CardHonorContainer">
      <div className="CardHonorHeaderContainer">
        <h3>{headerCardAuxiliar}</h3>
      </div>
      <div className="CardHonorContent">
      <TablaHonor estudiantesHonor={estudiantesHonor}/>
      </div>
    </div>
  );
}

export default CardAuxiliar;
