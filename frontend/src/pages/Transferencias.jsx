import { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import { obtenerMisCuentas } from "../api/cuentas";
import { transferir } from "../api/transferencias";
import { mensajeError } from "../api/client";
import { guardarFrecuente } from "../utils/frecuentes";
import { formatearDinero, enmascararCuenta } from "../utils/format";
import EstadoCarga from "../components/common/EstadoCarga";
import PasoDestinatario from "../components/transferencia/PasoDestinatario";
import PasoMonto from "../components/transferencia/PasoMonto";
import PasoConfirmar from "../components/transferencia/PasoConfirmar";
import Resultado from "../components/transferencia/Resultado";

const NOMBRES_PASOS = ["Destinatario", "Monto", "Confirmar"];

export default function Transferencias() {
  const { usuario } = useAuth();
  const cuentas = useFetch(obtenerMisCuentas);

  const [paso, setPaso] = useState(1);
  const [cuentaId, setCuentaId] = useState(null);
  const [destinatario, setDestinatario] = useState(null);
  const [monto, setMonto] = useState("");
  const [concepto, setConcepto] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(null);

  const activas = cuentas.data?.filter((c) => c.activo) ?? [];
  const cuentaOrigen = activas.find((c) => c.id === cuentaId) ?? activas[0];

  const reiniciar = () => {
    setPaso(1);
    setDestinatario(null);
    setMonto("");
    setConcepto("");
    setError("");
    setResultado(null);
  };

  const confirmar = async () => {
    if (enviando) return;
    setError("");
    setEnviando(true);
    try {
      const { data } = await transferir({
        cuentaOrigenId: cuentaOrigen.id,
        numeroCuentaDestino: destinatario.numeroCuenta,
        monto: Number(monto),
        concepto: concepto.trim() || null,
      });
      setResultado(data);
      if (data.estado === "COMPLETADA") {
        guardarFrecuente(usuario.username, destinatario);
      }
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <h1 className="titulo-pagina display-6 mb-4">Transferencias</h1>

      <EstadoCarga cargando={cuentas.cargando} error={cuentas.error}>
        {!cuentaOrigen ? (
          <div className="alert alert-warning">No tienes una cuenta activa para transferir.</div>
        ) : resultado ? (
          <Resultado resultado={resultado} destinatario={destinatario} onNueva={reiniciar} />
        ) : (
          <div style={{ maxWidth: 820 }}>
            <div className="pasos">
              {NOMBRES_PASOS.map((nombre, i) => {
                const numero = i + 1;
                const estado = paso === numero ? "activo" : paso > numero ? "hecho" : "";
                return (
                  <div key={nombre} className={`paso ${estado}`}>
                    <span className="paso-num">
                      {paso > numero ? <i className="bi bi-check-lg" /> : numero}
                    </span>
                    {nombre}
                  </div>
                );
              })}
            </div>

            {paso < 3 && (
              <div className="origen-card">
                <div>
                  <small className="text-muted fw-semibold">Desde tu cuenta</small>
                  {activas.length > 1 && paso === 1 ? (
                    <select
                      className="form-select form-select-sm mt-1"
                      value={cuentaOrigen.id}
                      onChange={(e) => setCuentaId(Number(e.target.value))}
                    >
                      {activas.map((c) => (
                        <option key={c.id} value={c.id}>
                          {enmascararCuenta(c.codigoUnico)} — {formatearDinero(c.saldo)}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="fw-bold">
                      Cuenta de ahorro · {enmascararCuenta(cuentaOrigen.codigoUnico)}
                    </div>
                  )}
                </div>
                <div className="text-end">
                  <small className="text-muted fw-semibold">Saldo disponible</small>
                  <div className="fw-bold fs-5">{formatearDinero(cuentaOrigen.saldo)}</div>
                </div>
              </div>
            )}

            {paso === 1 && (
              <PasoDestinatario
                cuentaOrigen={cuentaOrigen}
                destinatario={destinatario}
                onEncontrado={setDestinatario}
                onContinuar={() => setPaso(2)}
              />
            )}
            {paso === 2 && (
              <PasoMonto
                destinatario={destinatario}
                cuentaOrigen={cuentaOrigen}
                monto={monto}
                concepto={concepto}
                setMonto={setMonto}
                setConcepto={setConcepto}
                onAtras={() => setPaso(1)}
                onContinuar={() => setPaso(3)}
              />
            )}
            {paso === 3 && (
              <PasoConfirmar
                destinatario={destinatario}
                monto={monto}
                concepto={concepto}
                enviando={enviando}
                error={error}
                onAtras={() => setPaso(2)}
                onConfirmar={confirmar}
              />
            )}
          </div>
        )}
      </EstadoCarga>
    </>
  );
}