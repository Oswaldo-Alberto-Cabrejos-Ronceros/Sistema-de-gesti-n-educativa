import React from "react";
import "./CardInformeDocenteAdministrador.css";
import TablaVerNotasDocenteAdministrador from "../TablaVerNotasDocenteAdministrador/TablaVerNotasDocenteAdministrador";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import InformesSevice from "../../../services/informesSevice";
import TablaVerNotasDocenteAdministradorBimestral from "../TablaVerNotasDocenteAdministradorBimestral/TablaVerNotasDocenteAdministradorBimestral";

function CardInformeDocenteAdministrador({
  info,
  estudiantes,
  notas,
  competencias,
  nivel,
  grado,
  subcursoId,
  unidad,
  bimestral,
  bimestre,
}) {
  let headerCardInforme = "";
  let conElementHeader = 0;
  info.map((element) => {
    headerCardInforme += element;
    conElementHeader++;
    if (conElementHeader < info.length) {
      headerCardInforme += " - ";
    }
  });

  //logica de descarga del informe auxiliar
  const handleDescargarInformeAuxiliar = async () => {
    try {
      const response = await InformesSevice.generarReporteNotasAuxiliar(
        nivel,
        grado,
        subcursoId,
        unidad
      );

      // Crea un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `informe_nivel_${nivel}_grado_${grado}_unidad_${unidad}.xlsx`
      );

      // Agrega el enlace al DOM, hace clic en él y luego lo elimina
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Libera el objeto URL creado
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el informe:", error);
    }
  };

  const handleDescargarInformeBimestral = async () => {
    try {
      const response = await InformesSevice.generarReporteNotasBimestral(
        nivel,
        grado,
        subcursoId,
        bimestre
      );

      // Crea un enlace temporal para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `informe_nivel_${nivel}_grado_${grado}_bimestre_${bimestre}.xlsx`
      );

      // Agrega el enlace al DOM, hace clic en él y luego lo elimina
      document.body.appendChild(link);
      link.click();
      link.remove();

      // Libera el objeto URL creado
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al descargar el informe:", error);
    }
  };

  return (
    <div className="CardInformeDocenteAdministradorContainer">
      <div className="CardInformeDocenteAdministradorHeaderContainer">
        <h3>{headerCardInforme}</h3>
      </div>
      <div className="CardInformeDocenteAdministradorContent">
        {bimestral === true ? (
          <TablaVerNotasDocenteAdministradorBimestral
            estudiantes={estudiantes}
            notas={notas}
            competencias={competencias}
            bimestre={bimestre}
          />
        ) : (
          <TablaVerNotasDocenteAdministrador
            estudiantes={estudiantes}
            notas={notas}
            competencias={competencias}
          />
        )}
      </div>
      <div className="CardInformeDocenteAdministradorButtonContainer">
        {estudiantes.length === 0 ? (
          <div></div>
        ) : bimestral === true ? (
          <PrimaryButton
            nombre={"Descargar"}
            onClick={handleDescargarInformeBimestral}
          />
        ) : (
          <PrimaryButton
            nombre={"Descargar"}
            onClick={handleDescargarInformeAuxiliar}
          />
        )}
      </div>
    </div>
  );
}

export default CardInformeDocenteAdministrador;
