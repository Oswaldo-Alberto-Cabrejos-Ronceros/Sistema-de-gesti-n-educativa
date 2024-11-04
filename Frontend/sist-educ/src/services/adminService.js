import axios from 'axios';

const API_URL = 'http://localhost:8080/api/administradores';

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
class AdminService{

    getAllAdmin(){
        return axios.get(API_URL);
    }
    createAdmin(admin){
        return axios.post(API_URL,admin);
    }
    updateAdmin(Id,ActualizarAdministradorRequest){
        return axios.put(`${API_URL}/${Id}`,ActualizarAdministradorRequest);
    }
    AdminUpdateAlumno(id, alumnoData) {
        return axios.put(`${API_URL}/updateAll/${id}`, alumnoData);
    }
}
export default new AdminService();