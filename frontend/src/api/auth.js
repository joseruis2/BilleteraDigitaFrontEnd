import api from "./client";

export const registrar = (datos) => api.post("/api/clientes/registro", datos);