import axios from 'axios';

const API_URL = 'http://localhost:8080/api/subcursos';
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

class subcursoService{
    getAllSubCurso(){
        return axios.get(`${API_URL}/list`);
    }

    listarSubcursosPorUsuario(usuarioId, rol) {
        return axios.get(`${API_URL}/usuario/${usuarioId}`, {
            params: {
                rol: rol
            }
        });
    }
    

    getlistarSubcursosPorCurso(cursoId){
        return axios.get(`${API_URL}/curso/${cursoId}`);
    }

    createSubcurso(subCursoData){
        return axios.post(`${API_URL}/curso/${subCursoData.cursoId}`,subCursoData);
    }
    BuscarSubCursoPorId(IdSubcurso){
        return axios.put(`${API_URL}/${IdSubcurso}`);
    }
    SubcursoUpdate(SubCursoId, DataUpdate) {
        return axios.put(`${API_URL}/update/${SubCursoId}`, DataUpdate);
    }
    deleteSubcurso(IdSubcurso){
        return axios.delete(`${API_URL}/${IdSubcurso}`);
    }

    
}
export default new subcursoService();