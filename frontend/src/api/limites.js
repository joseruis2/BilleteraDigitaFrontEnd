import api from "./client";

export const obtenerLimites = () => api.get("/api/limites");