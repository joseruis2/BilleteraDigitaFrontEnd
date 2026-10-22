import { Link } from "react-router-dom";
import { formatearDinero, formatearFecha, enmascararCuenta } from "../../utils/format";

export default function Resultado({ resultado, destinatario, onNueva }) {
  const exito = resultado.estado === "COMPLETADA";

  return (
    <div className="panel text-center mx-auto" style={{ maxWidth: 520 }}>
      <div className="icono-resultado" style={{ background: exito ? "#3ddc84" : "#dc3545" }}>
        {exito ? "✓" : "✕"}
      </div>

      <h4 className="fw-bold">{exito ? "¡Transferencia Exitosa!" : "No se pudo completar"}</h4>
      <p className="text-muted">
        {exito ? "El dinero ha sido enviado correctamente" : "Tu dinero no fue descontado. Puedes intentarlo de nuevo."}
      </p>

      <div className="display-5 fw-bold my-3">{formatearDinero(resultado.monto)}</div>

      <div className="text-start">
        <div className="row py-2 border-top">
          <div className="col-5 text-muted fw-semibold">Destinatario</div>
          <div className="col-7 fw-semibold">
            {resultado.nombreDestinatario}
            <div className="text-muted fw-normal">{enmascararCuenta(destinatario.numeroCuenta)}</div>
          </div>
        </div>
        {resultado.fecha && (
          <div className="row py-2 border-top">
            <div className="col-5 text-muted fw-semibold">Fecha</div>
            <div className="col-7 fw-semibold">{formatearFecha(resultado.fecha)}</div>
          </div>
        )}
        <div className="row py-2 border-top">
          <div className="col-5 text-muted fw-semibold">Código</div>
          <div className="col-7 fw-semibold">{resultado.codigoUnico}</div>
        </div>
        {!exito && resultado.motivoFallo && (
          <div className="alert alert-danger py-2 mt-3 mb-0">{resultado.motivoFallo}</div>
        )}
      </div>

      <div className="d-grid gap-2 mt-4">
        <Link to="/dashboard" className="btn btn-brand">Volver al inicio</Link>
        <button className="btn btn-outline-secondary" onClick={onNueva}>
          {exito ? "Hacer otra transferencia" : "Intentar de nuevo"}
        </button>
      </div>
    </div>
  );
}