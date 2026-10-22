import api from "./client";

export const obtenerPerfil = () => api.get("/api/clientes/me");