import axios from 'axios';

// Crear una instancia de Axios
const axiosInstance = axios.create();

// Interceptor para agregar el token a cada solicitud
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("jwtToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        config.withCredentials = true; // Para enviar cookies HTTP-only
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para manejar respuestas
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            if (!originalRequest.url.includes('/auth/refresh')) {
                try {
                    // Intentar refrescar el token
                    const response = await axiosInstance.post('http://18.231.151.214:8080/auth/refresh');
                    const newToken = response.data.jwt;
                    sessionStorage.setItem("jwtToken", newToken);
                    originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    // Si falla el refresco, redirigir al login o manejar el error
                    // Limpiar el token almacenado
                    sessionStorage.removeItem("jwtToken");
                    sessionStorage.removeItem("userData");
                    // Redirigir al login
                    window.location.href = '/login';
                    return Promise.reject(refreshError);
                }
            }
        }
        return Promise.reject(error);
    }
);
export default axiosInstance;