const MAX = 8;
const clave = (username) => `frecuentes:${username}`;

export function obtenerFrecuentes(username) {
  try {
    return JSON.parse(localStorage.getItem(clave(username))) ?? [];
  } catch {
    return [];
  }
}

// Más reciente primero, sin duplicados
export function guardarFrecuente(username, { numeroCuenta, nombreCompleto }) {
  const resto = obtenerFrecuentes(username).filter((f) => f.numeroCuenta !== numeroCuenta);
  const nuevos = [{ numeroCuenta, nombreCompleto }, ...resto].slice(0, MAX);
  localStorage.setItem(clave(username), JSON.stringify(nuevos));
}