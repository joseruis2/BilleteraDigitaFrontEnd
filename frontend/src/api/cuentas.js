import api from "./client";

export const obtenerMisCuentas = () => api.get("/api/cuentas/mias");