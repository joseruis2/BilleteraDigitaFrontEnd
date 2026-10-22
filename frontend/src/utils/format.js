const formato = new Intl.NumberFormat("es-PE", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const formatearDinero = (valor) => `S/. ${formato.format(valor)}`;

export const formatearFecha = (iso) =>
  new Date(iso).toLocaleString("es-PE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

// "CTA0FB2779E73F2" -> "********73F2"
export const enmascararCuenta = (codigo) =>
  codigo.length <= 4 ? codigo : "*".repeat(8) + codigo.slice(-4);

// "Jose Ruiz Quispe" -> "JR"
export const iniciales = (nombre) =>
  nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");