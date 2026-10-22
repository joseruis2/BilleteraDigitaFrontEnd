import api from "./client";

export const obtenerHistorial = () => api.get("/api/transferencias/historial");

export const buscarDestinatario = (numeroCuenta) =>
  api.get("/api/transferencias/destinatario", { params: { numeroCuenta } });

export const transferir = (datos) => api.post("/api/transferencias", datos);