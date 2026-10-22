import { formatearDinero, enmascararCuenta } from "../../utils/format";

export default function CuentaCard({ cuenta }) {
  return (
    <div className="tarjeta-cuenta">
      <div className="punto-cuenta mb-3" />
      <div className="fw-bold">Cuenta de ahorro</div>
      <div className="small mb-2" style={{ letterSpacing: 1 }}>{enmascararCuenta(cuenta.codigoUnico)}</div>
      <div className="fs-3 fw-bold mb-3">{formatearDinero(cuenta.saldo)}</div>
      {cuenta.activo ? (
        <span className="insignia-activa">Activa</span>
      ) : (
        <span className="badge rounded-pill bg-secondary">Inactiva</span>
      )}
    </div>
  );
}