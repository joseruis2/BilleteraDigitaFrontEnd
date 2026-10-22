import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePerfil } from "../context/PerfilContext";
import useFetch from "../hooks/useFetch";
import { obtenerMisCuentas } from "../api/cuentas";
import { obtenerHistorial } from "../api/transferencias";
import EstadoCarga from "../components/common/EstadoCarga";
import CuentaCard from "../components/cuentas/CuentaCard";
import { formatearDinero, formatearFecha } from "../utils/format";

export default function Dashboard() {
  const { usuario } = useAuth();
  const { perfil } = usePerfil();
  const cuentas = useFetch(obtenerMisCuentas);
  const historial = useFetch(obtenerHistorial);

  const primerNombre = perfil?.nombres?.split(" ")[0] ?? usuario.username;
  const saldoTotal = cuentas.data?.reduce((acc, c) => acc + c.saldo, 0) ?? 0;
  const recientes = historial.data?.slice(0, 5) ?? [];

  return (
    <>
      <h1 className="titulo-pagina mb-0">¡Hola, {primerNombre}!</h1>
      <p className="text-muted fw-semibold mb-4">Aquí tienes un resumen de tus cuentas</p>

      <div className="row g-3 mb-3">
        <div className="col-12 col-lg-7">
          <div className="tarjeta-saldo h-100">
            <div className="fw-semibold mb-1">Saldo Disponible</div>
            <div className="display-5 fw-bold mb-3">
              {cuentas.cargando ? "..." : formatearDinero(saldoTotal)}
            </div>
            <Link to="/historial" className="btn btn-ver-mov">Ver Movimientos</Link>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="panel h-100 d-flex align-items-center">

            <div className="acciones-rapidas">
              <Link to="/transferencias" className="accion-item">
                <div className="circulo-accion"><i className="bi bi-send-fill" /></div>
                Enviar Dinero
              </Link>
              <Link to="/historial" className="accion-item">
                <div className="circulo-accion"><i className="bi bi-clock-history" /></div>
                Historial
              </Link>
              <Link to="/cuentas" className="accion-item">
                <div className="circulo-accion"><i className="bi bi-wallet2" /></div>
                Mis cuentas
              </Link>
              <Link to="/limites" className="accion-item">
                <div className="circulo-accion"><i className="bi bi-speedometer2" /></div>
                Límites
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-7">
          <div className="panel-gris h-100">
            <h4 className="fw-bold mb-3">Tus cuentas</h4>
            <EstadoCarga cargando={cuentas.cargando} error={cuentas.error}>
              <div className="row g-3">
                {cuentas.data?.map((c) => (
                  <div key={c.id} className="col-12 col-md-6">
                    <CuentaCard cuenta={c} />
                  </div>
                ))}
              </div>
            </EstadoCarga>
          </div>
        </div>

        <div className="col-12 col-lg-5">
          <div className="panel h-100">
            <h5 className="fw-bold mb-3">Movimientos Recientes</h5>
            <EstadoCarga cargando={historial.cargando} error={historial.error}>
              {recientes.length === 0 && <p className="text-muted mb-0">Sin movimientos todavía.</p>}
              <ul className="list-unstyled mb-0">
                {recientes.map((m) => (
                  <li key={m.codigoUnico} className="d-flex justify-content-between py-2 border-bottom">
                    <div>
                      <div className="fw-semibold">{m.concepto || "Transferencia"}</div>
                      <small className="text-muted">{formatearFecha(m.fecha)}</small>
                    </div>
                    <div className="text-end">
                      <div className={m.estado === "COMPLETADA" ? "text-danger fw-bold" : "text-muted"}>
                        {m.estado === "COMPLETADA" ? "-" : ""}{formatearDinero(m.monto)}
                      </div>
                      {m.estado !== "COMPLETADA" && <small className="text-muted">{m.estado}</small>}
                    </div>
                  </li>
                ))}
              </ul>
            </EstadoCarga>
          </div>
        </div>
      </div>
    </>
  );
}