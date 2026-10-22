import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const esLogin = error.config?.url?.includes("/api/auth/login");
    // Solo cerramos sesión si el token expiró, no si falló el login
    if (error.response?.status === 401 && !esLogin) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("usuario");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const mensajeError = (error) =>
  error.response?.data?.detail ||
  error.response?.data?.title ||
  "No se pudo conectar con el servidor";

export default api;