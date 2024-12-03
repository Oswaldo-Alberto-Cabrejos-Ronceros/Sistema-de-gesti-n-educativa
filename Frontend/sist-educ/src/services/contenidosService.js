import axiosInstance from './axiosInstance';

const API_URL = 'http://18.231.151.214:8080/api/contenidos';

class ContenidosService{
    //metodo para subir contenido
    subirContenido(subcursoId,nivel,grado,unidad,nombreContenido,descripcion,isTarea,archivo){
        const formData = new FormData();
        formData.append('subcursoId', subcursoId);
        formData.append('nivel', nivel);
        formData.append('grado', grado);
        formData.append('unidad', unidad);
        formData.append('nombreContenido', nombreContenido);
        formData.append('descripcion', descripcion);
        formData.append('isTarea', isTarea);
        formData.append('archivo', archivo);
        return axiosInstance.post(`${API_URL}/subir`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
    obtenerContenidos(nivel,grado,subcursoId,unidad){
        return axiosInstance.get(`${API_URL}/nivel/${nivel}/grado/${grado}/subcurso/${subcursoId}/unidad/${unidad}`);
    }

    eliminarContenido(contenidoId){
        return axiosInstance.delete(`${API_URL}/delete/${contenidoId}`)
    }

}

export default new ContenidosService();