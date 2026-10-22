import { useState } from "react";
import { buscarDestinatario } from "../../api/transferencias";
import { mensajeError } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import { obtenerFrecuentes } from "../../utils/frecuentes";
import { enmascararCuenta, iniciales } from "../../utils/format";

export default function PasoDestinatario({ cuentaOrigen, destinatario, onEncontrado, onContinuar }) {
  const { usuario } = useAuth();
  const [codigo, setCodigo] = useState(destinatario?.numeroCuenta ?? "");
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState("");
  const [frecuentes] = useState(() => obtenerFrecuentes(usuario.username));

  const buscar = async (valor) => {
    const limpio = valor.trim().toUpperCase();
    if (!limpio || buscando) return;

    setCodigo(limpio);
    setError("");
    onEncontrado(null);
    setBuscando(true);
    try {
      const { data } = await buscarDestinatario(limpio);
      if (cuentaOrigen && data.cuentaId === cuentaOrigen.id) {
        setError("No puedes transferir a tu propia cuenta");
        return;
      }
      // La respuesta solo trae el número enmascarado; guardamos el código
      // original porque es el que pide el POST de la transferencia.
      onEncontrado({ ...data, numeroCuenta: limpio });
    } catch (err) {
      setError(err.response?.status === 404 ? "No existe una cuenta con ese número" : mensajeError(err));
    } finally {
      setBuscando(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscar(codigo);
  };

  return (
    <>
      <h2 className="pregunta-destino mb-3">¿A quién desea enviar dinero?</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <label htmlFor="cuenta-destino" className="form-label fw-bold">Número de cuenta</label>
        <div className="buscador">
          <input
            id="cuenta-destino"
            placeholder="Ingrese el número de cuenta"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            autoComplete="off"
          />
          <button
            type="submit"
            className="btn-lupa"
            disabled={buscando || !codigo.trim()}
            aria-label="Buscar cuenta"
          >
            {buscando ? <span className="spinner-border spinner-border-sm" /> : <i className="bi bi-search" />}
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger py-2">
          <i className="bi bi-exclamation-circle me-2" />
          {error}
        </div>
      )}

      {destinatario && (
        <div className="destinatario-ok mb-3">
          <div className="avatar-iniciales">{iniciales(destinatario.nombreCompleto)}</div>
          <div className="flex-grow-1">
            <div className="fw-bold">{destinatario.nombreCompleto}</div>
            <div className="text-muted small">{enmascararCuenta(destinatario.numeroCuenta)}</div>
          </div>
          <span className="destinatario-check">
            <i className="bi bi-check-circle-fill" /> Cuenta verificada
          </span>
        </div>
      )}

      <label className="form-label fw-bold">Número frecuente</label>
      <div className="panel-frecuentes mb-4">
        {frecuentes.length === 0 ? (
          <div className="frecuentes-vacio">
            <i className="bi bi-people" />
            <p className="mb-0">Aquí aparecerán las personas a las que ya enviaste dinero.</p>
          </div>
        ) : (
          <div className="frecuentes-grid">
            {frecuentes.map((f) => (
              <button
                key={f.numeroCuenta}
                type="button"
                className={`item-frecuente ${destinatario?.numeroCuenta === f.numeroCuenta ? "seleccionado" : ""}`}
                onClick={() => buscar(f.numeroCuenta)}
              >
                <div className="avatar-iniciales">{iniciales(f.nombreCompleto)}</div>
                <div className="text-start">
                  <div className="fw-bold">{f.nombreCompleto}</div>
                  <div className="text-muted small">{enmascararCuenta(f.numeroCuenta)}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-end">
        <button className="btn btn-brand btn-continuar" disabled={!destinatario} onClick={onContinuar}>
          Continuar <i className="bi bi-arrow-right ms-1" />
        </button>
      </div>
    </>
  );
}