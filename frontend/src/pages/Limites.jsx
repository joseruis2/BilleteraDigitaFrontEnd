import useFetch from "../hooks/useFetch";
import { obtenerLimites } from "../api/limites";
import EstadoCarga from "../components/common/EstadoCarga";
import { formatearDinero, formatearFecha } from "../utils/format";

export default function Limites() {
  const { data, cargando, error } = useFetch(obtenerLimites);

  const porcentaje = data ? Math.min(100, (data.montoUsado / data.montoLimite) * 100) : 0;
  const color = porcentaje >= 90 ? "bg-danger" : porcentaje >= 70 ? "bg-warning" : "bg-success";

  return (
    <>
      <h1 className="titulo-pagina mb-4">Límites Transaccionales</h1>
      <EstadoCarga cargando={cargando} error={error}>
        {data && (
          <div style={{ maxWidth: 760 }}>
            <div className="panel-gris mb-3">
              <h5 className="fw-bold">Límite diario transaccional</h5>
              <div className="fs-4 fw-bold">{formatearDinero(data.montoLimite)}</div>
              <div className="text-end text-muted fw-semibold">Usado: {formatearDinero(data.montoUsado)}</div>

              <div className="progress my-2" style={{ height: 24 }}>
                <div className={`progress-bar ${color}`} style={{ width: `${porcentaje}%` }} />
              </div>

              <div className="text-end text-muted fw-semibold">
                Disponible: {formatearDinero(data.montoDisponible)}
              </div>
            </div>

            <div className="panel">
              <h5 className="fw-bold mb-3">Historial del día</h5>
              {data.historialDelDia.length === 0 && <p className="text-muted mb-0">Sin movimientos hoy.</p>}
              {data.historialDelDia.map((m) => (
                <div key={m.codigoUnico} className="d-flex justify-content-between py-2 border-bottom">
                  <div>
                    <div className="fw-semibold">{m.concepto || "Transferencia"}</div>
                    <small className="text-muted">{formatearFecha(m.fecha)} · {m.estado}</small>
                  </div>
                  <div className={`fw-bold ${m.estado === "COMPLETADA" ? "text-danger" : "text-muted"}`}>
                    {m.estado === "COMPLETADA" ? "-" : ""}{formatearDinero(m.monto)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </EstadoCarga>
    </>
  );
}