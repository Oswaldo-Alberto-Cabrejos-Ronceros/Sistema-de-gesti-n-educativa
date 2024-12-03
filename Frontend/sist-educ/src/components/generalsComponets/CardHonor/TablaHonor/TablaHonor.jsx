import React,{useState,useEffect} from "react";
import "./TablaHonor.css";

function TablaHonor({estudiantesHonor}) {
  
  const [isSmall, setisSmall] = useState(window.innerWidth > 464);

  useEffect(() => {
    
    const handleResize = () => {
      setisSmall(window.innerWidth > 464);
    };


    window.addEventListener("resize", handleResize);

    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="TablaHonorContainer">
      {estudiantesHonor.length === 0 ? (
        <div className="TablaHonorEmpty">
          <h2>No hay notas registradas</h2>
        </div>
      ) : (
        <div>
            <table className="TableHonor">
                <thead>
                    <tr>
                        <th>Mérito</th>
                        <th>Apellidos</th>
                        <th>Nombres</th>
                        <th>{isSmall?("Promedio"):("P")}</th>
                    </tr>
                </thead>
                <tbody>
                    {estudiantesHonor.map((estudiante, index)=>(
                        <tr key={estudiante.Merito || index}>
                            <td>{index+1}</td>
                            <td>{estudiante.alumno.apellido}</td>
                            <td>{estudiante.alumno.nombre}</td>
                            <td>{parseInt(estudiante.promedio)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      )}
    </div>
  );
}

export default TablaHonor;
