import { useState } from "react";

import "./App.css";
import VInicioSesion from "./components/v-iniciosesion/VInicioSesion/VInicioSesion";
import VEstudiante from "./components/VEstudiante/VEstudiante";
import VDocente from "./components/VDocente/VDocente";
import VAdministrador from "./components/VAdministrador/VAdministrador";
function App() {

  return (
    <>
      {/*<VEstudiante/>*/}
      {/*<VDocente/>*/}
      {/*<VInicioSesion/>*/}
      <VAdministrador/>
    </>
  );
}

export default App;
