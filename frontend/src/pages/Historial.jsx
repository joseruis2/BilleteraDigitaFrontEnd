import useFetch from "../hooks/useFetch";
import { obtenerHistorial } from "../api/transferencias";
import EstadoCarga from "../components/common/EstadoCarga";
import { formatearDinero, formatearFecha } from "../utils/format";

const BADGE = {
  COMPLETADA: "bg-success",
  FALLIDA: "bg-danger",
  INICIADA: "bg-warning text-dark",
};

export default function Historial() {
  const { data, cargando, error } = useFetch(obtenerHistorial);

  return (
    <>
      <h1 className="titulo-pagina mb-4">Historial del movimiento</h1>
      <EstadoCarga cargando={cargando} error={error}>
        {data?.length === 0 && <p className="text-muted">Aún no tienes movimientos.</p>}
        <div className="panel">
          {data?.map((m) => (
            <div key={m.codigoUnico} className="d-flex justify-content-between align-items-center py-3 border-bottom">
              <div>
                <div className="fw-bold">{m.concepto || "Transferencia"}</div>
                <small className="text-muted">{formatearFecha(m.fecha)} · {m.codigoUnico}</small>
              </div>
              <div className="text-end">
                <div className={`fw-bold fs-5 ${m.estado === "COMPLETADA" ? "text-danger" : "text-muted"}`}>
                  {m.estado === "COMPLETADA" ? "-" : ""}{formatearDinero(m.monto)}
                </div>
                <span className={`badge ${BADGE[m.estado] ?? "bg-secondary"}`}>{m.estado}</span>
              </div>
            </div>
          ))}
        </div>
      </EstadoCarga>
    </>
  );
}