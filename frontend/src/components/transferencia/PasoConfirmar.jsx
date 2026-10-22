import { formatearDinero, enmascararCuenta, iniciales } from "../../utils/format";

const COMISION = 0;

export default function PasoConfirmar({ destinatario, monto, concepto, enviando, error, onAtras, onConfirmar }) {
  return (
    <>
      <div className="tarjeta-confirmar mb-3">
        <div className="text-muted fw-semibold">Vas a enviar</div>
        <div className="monto-confirmar mb-3">{formatearDinero(Number(monto))}</div>

        <div className="d-flex gap-3 align-items-start">
          <div className="avatar-iniciales flex-shrink-0">{iniciales(destinatario.nombreCompleto)}</div>

          <div className="flex-grow-1">
            <div className="fila-confirmar">
              <span className="etiqueta-confirmar">Destinatario</span>
              <span className="valor-confirmar">
                {destinatario.nombreCompleto}
                <br />
                {enmascararCuenta(destinatario.numeroCuenta)}
              </span>
            </div>
            <div className="fila-confirmar">
              <span className="etiqueta-confirmar">Concepto</span>
              <span className="valor-confirmar">{concepto.trim() || "—"}</span>
            </div>
            <div className="fila-confirmar">
              <span className="etiqueta-confirmar">Comisión</span>
              <span className="valor-confirmar">{formatearDinero(COMISION)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="banner-seguro mb-3">Esta transferencia es segura y protegida</div>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <div className="d-flex justify-content-between">
        <button className="btn-atras" onClick={onAtras} disabled={enviando}>
          Atrás
        </button>
        <button className="btn btn-brand btn-continuar" onClick={onConfirmar} disabled={enviando}>
          {enviando ? "Enviando..." : "Continuar"}
        </button>
      </div>
    </>
  );
}