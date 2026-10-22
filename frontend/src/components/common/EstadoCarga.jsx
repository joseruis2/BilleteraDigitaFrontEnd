export default function EstadoCarga({ cargando, error, children }) {
  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-secondary" role="status" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="alert alert-danger">
        No se pudo cargar la información. Intenta de nuevo.
      </div>
    );
  }
  return children;
}