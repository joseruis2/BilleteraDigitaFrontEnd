import useFetch from "../hooks/useFetch";
import { obtenerMisCuentas } from "../api/cuentas";
import EstadoCarga from "../components/common/EstadoCarga";
import CuentaCard from "../components/cuentas/CuentaCard";

export default function MisCuentas() {
  const { data, cargando, error } = useFetch(obtenerMisCuentas);

  return (
    <>
      <h1 className="titulo-pagina mb-4">Mis Cuentas</h1>
      <EstadoCarga cargando={cargando} error={error}>
        <div className="row g-3">
          {data?.map((cuenta) => (
            <div key={cuenta.id} className="col-12 col-md-6 col-xl-4">
              <CuentaCard cuenta={cuenta} />
            </div>
          ))}
          {data?.length === 0 && <p className="text-muted">Aún no tienes cuentas.</p>}
        </div>
      </EstadoCarga>
    </>
  );
}