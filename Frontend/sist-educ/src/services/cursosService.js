import axios from "axios";

const API_URL = 'http://localhost:8080/api/cursos';
// Interceptor para agregar el token a cada solicitud
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

class CursoService {
    // Obtiene todos los cursos
    getAllCursos() {
      return axios.get(`${API_URL}/list`);
    }

    // Obtiene todos los cursos por nivel
    listarCursosPorNivel(Nivel) {
      return axios.get(`${API_URL}/nivel/${Nivel}`);
    }
  
    // Crea un nuevo curso
    createCurso(cursoData) {
      return axios.post(API_URL, cursoData);
    }
  
    // Busca un curso por ID
    getCursoById(cursoId) {
      return axios.get(`${API_URL}/${cursoId}`);
    }
  
    // Actualiza un curso con los campos proporcionados
    updateCurso(cursoId, dataUpdate) {
      return axios.put(`${API_URL}/update/${cursoId}`, dataUpdate);
    }
  
    // Elimina un curso por ID
    deleteCurso(cursoId) {
      return axios.delete(`${API_URL}/${cursoId}`);
    }
  }
  
  export default new CursoService();