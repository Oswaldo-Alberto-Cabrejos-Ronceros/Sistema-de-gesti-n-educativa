import axiosInstance from './axiosInstance';

const API_URL = 'http://18.231.151.214:8080/api/subcursos';


class subcursoService{
    getAllSubCurso(){
        return axiosInstance.get(`${API_URL}/list`);
    }

    listarSubcursosPorUsuario(usuarioId, rol) {
        return axiosInstance.get(`${API_URL}/usuario/${usuarioId}`, {
            params: {
                rol: rol
            }
        });
    }
    

    getlistarSubcursosPorCurso(cursoId){
        return axiosInstance.get(`${API_URL}/curso/${cursoId}`);
    }


    getlistarSubcursosPorNivel(nivel){
        return axiosInstance.get(`${API_URL}/nivel/${nivel}`);
    }


    createSubcurso(subCursoData){
        return axiosInstance.post(`${API_URL}/curso/${subCursoData.cursoId}`,subCursoData);
    }
    BuscarSubCursoPorId(IdSubcurso){
        return axiosInstance.put(`${API_URL}/${IdSubcurso}`);
    }
    SubcursoUpdate(SubCursoId, DataUpdate) {
        return axiosInstance.put(`${API_URL}/update/${SubCursoId}`, DataUpdate);
    }
    deleteSubcurso(IdSubcurso){
        return axiosInstance.delete(`${API_URL}/${IdSubcurso}`);
    }

    
}
export default new subcursoService();