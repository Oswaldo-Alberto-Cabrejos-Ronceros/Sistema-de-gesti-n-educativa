import axios from "axios";

// URL base para los endpoints de reportes
const API_URL = "http://localhost:8080/reportes";

// Interceptor para agregar el token de autorización a cada solicitud
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("jwtToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class InformesService {
  // Método para obtener el informe en formato Excel
  generarReporteNotasAuxiliar(nivel, grado, subcursoId, unidad) {
    return axios.get(
      `${API_URL}/notas/auxiliar`,
      {
        params: {
          nivel: nivel,
          grado: grado,
          subcursoId: subcursoId,
          unidad: unidad,
        },
        responseType: "blob", // Especifica que la respuesta será un blob (archivo binario)
      }
    );
  }

  //metodo para bimestre
  generarReporteNotasBimestral(nivel, grado, subcursoId, bimestre) {
    return axios.get(`${API_URL}/notas/bimestral`, {
      params: {
        nivel: nivel,
        grado: grado,
        subcursoId: subcursoId,
        bimestre: bimestre,
      },
      responseType: "blob", // Especifica que la respuesta será un blob (archivo binario)
    });
  }
}

export default new InformesService();