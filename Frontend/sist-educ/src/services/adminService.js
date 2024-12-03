import axiosInstance from './axiosInstance';


const API_URL = 'http://18.231.151.214:8080/api/administradores';


class AdminService{

    getAllAdmin(){
        return axiosInstance.get(API_URL);
    }
    createAdmin(admin){
        return axiosInstance.post(API_URL,admin);
    }
    updateAdmin(Id,ActualizarAdministradorRequest){
        return axiosInstance.put(`${API_URL}/${Id}`,ActualizarAdministradorRequest);
    }
    AdminUpdateAlumno(id, alumnoData) {
        return axiosInstance.put(`${API_URL}/updateAll/${id}`, alumnoData);
    }
}
export default new AdminService();