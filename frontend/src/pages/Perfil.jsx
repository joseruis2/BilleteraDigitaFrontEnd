import { usePerfil } from "../context/PerfilContext";

export default function Perfil() {
  const { perfil } = usePerfil();

  if (!perfil) {
    return <div className="alert alert-danger">No se pudo cargar tu perfil. Intenta de nuevo.</div>;
  }

  const filas = [
    ["Nombre", perfil.nombres],
    ["Apellidos", perfil.apellidos],
    [perfil.tipoDocumento, perfil.numeroDocumento],
    ["Celular", perfil.celular],
    ["Correo", perfil.correo],
  ];

  return (
    <>
      <h1 className="titulo-pagina display-6 mb-4">Mi Perfil</h1>

      <div className="perfil-card">
        <h2 className="perfil-titulo">Información Personal</h2>
        {filas.map(([etiqueta, valor]) => (
          <div key={etiqueta} className="perfil-fila">
            <span className="perfil-etiqueta">{etiqueta}</span>
            <span className="perfil-valor">{valor}</span>
          </div>
        ))}
      </div>
    </>
  );
}