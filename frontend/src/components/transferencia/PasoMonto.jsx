import { formatearDinero, enmascararCuenta, iniciales } from "../../utils/format";

export default function PasoMonto({ destinatario, cuentaOrigen, monto, concepto, setMonto, setConcepto, onAtras, onContinuar }) {
  const valor = Number(monto);
  const formatoValido = /^\d+(\.\d{1,2})?$/.test(monto);

  let aviso = "";
  if (monto && !formatoValido) aviso = "Ingresa un monto válido (máximo 2 decimales)";
  else if (formatoValido && valor <= 0) aviso = "El monto debe ser mayor a 0";
  else if (formatoValido && valor > cuentaOrigen.saldo) aviso = "El monto supera tu saldo disponible";

  const puedeContinuar = formatoValido && valor > 0 && valor <= cuentaOrigen.saldo;

  return (
    <>
      <div className="panel d-flex align-items-center gap-3 mb-4">
        <div className="avatar-iniciales">{iniciales(destinatario.nombreCompleto)}</div>
        <div>
          <div className="fw-bold fs-5">{destinatario.nombreCompleto}</div>
          <div className="text-muted">{enmascararCuenta(destinatario.numeroCuenta)}</div>
        </div>
      </div>

      <label className="form-label fw-semibold">
        Monto <span className="text-muted fw-normal">(disponible: {formatearDinero(cuentaOrigen.saldo)})</span>
      </label>
      <div className="input-group mb-1">
        <span className="input-group-text fw-bold">S/.</span>
        <input
          className="form-control"
          inputMode="decimal"
          placeholder="0.00"
          value={monto}
          onChange={(e) => setMonto(e.target.value.replace(",", "."))}
        />
      </div>
      {aviso && <div className="text-danger small mb-2">{aviso}</div>}

      <label className="form-label fw-semibold mt-3">Concepto (Opcional)</label>
      <textarea
        className="form-control mb-4"
        rows={3}
        maxLength={200}
        value={concepto}
        onChange={(e) => setConcepto(e.target.value)}
      />

      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-secondary px-4" onClick={onAtras}>Atrás</button>
        <button className="btn btn-brand px-4" disabled={!puedeContinuar} onClick={onContinuar}>
          Continuar
        </button>
      </div>
    </>
  );
}