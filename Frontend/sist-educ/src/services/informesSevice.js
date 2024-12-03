import axiosInstance from './axiosInstance';

// URL base para los endpoints de reportes
const API_URL = "http://18.231.151.214:8080/reportes";



class InformesService {
  // Método para obtener el informe en formato Excel
  generarReporteNotasAuxiliar(nivel, grado, subcursoId, unidad) {
    return axiosInstance.get(
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
    return axiosInstance.get(`${API_URL}/notas/bimestral`, {
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