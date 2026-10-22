import { useEffect } from "react";

export default function ConfirmModal({
  abierto,
  titulo,
  mensaje,
  textoConfirmar = "Aceptar",
  textoCancelar = "Cancelar",
  onConfirmar,
  onCancelar,
}) {
  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e) => {
      if (e.key === "Escape") onCancelar();
    };
    document.addEventListener("keydown", alPresionar);
    return () => document.removeEventListener("keydown", alPresionar);
  }, [abierto, onCancelar]);

  if (!abierto) return null;

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div
        className="modal fade show d-block"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-titulo"
        tabIndex={-1}
        onClick={onCancelar}
      >
        <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content border-0 shadow">
            <div className="modal-body text-center p-4">
              <h5 id="confirm-titulo" className="fw-bold mb-2">{titulo}</h5>
              <p className="text-muted mb-4">{mensaje}</p>
              <div className="d-flex gap-2 justify-content-center">
                <button type="button" className="btn btn-outline-secondary px-4" onClick={onCancelar}>
                  {textoCancelar}
                </button>
                <button type="button" className="btn btn-brand px-4" onClick={onConfirmar} autoFocus>
                  {textoConfirmar}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}