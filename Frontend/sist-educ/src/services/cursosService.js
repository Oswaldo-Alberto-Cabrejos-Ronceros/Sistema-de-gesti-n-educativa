import axiosInstance from './axiosInstance';

const API_URL = 'http://18.231.151.214:8080/api/cursos';


class CursoService {
    // Obtiene todos los cursos
    getAllCursos() {
      return axiosInstance.get(`${API_URL}/list`);
    }

    // Obtiene todos los cursos por nivel
    listarCursosPorNivel(Nivel) {
      return axiosInstance.get(`${API_URL}/nivel/${Nivel}`);
    }
  
    // Crea un nuevo curso
    createCurso(cursoData) {
      return axiosInstance.post(API_URL, cursoData);
    }
  
    // Busca un curso por ID
    getCursoById(cursoId) {
      return axiosInstance.get(`${API_URL}/${cursoId}`);
    }
  
    // Actualiza un curso con los campos proporcionados
    updateCurso(cursoId, dataUpdate) {
      return axiosInstance.put(`${API_URL}/update/${cursoId}`, dataUpdate);
    }
  
    // Elimina un curso por ID
    deleteCurso(cursoId) {
      return axiosInstance.delete(`${API_URL}/${cursoId}`);
    }
  }
  
  export default new CursoService();