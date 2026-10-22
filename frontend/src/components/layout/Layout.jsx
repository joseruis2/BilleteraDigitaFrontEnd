import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { usePerfil } from "../../context/PerfilContext";
import ConfirmModal from "../common/ConfirmModal";
import "../../styles/layout.css";

const menu = [
  { to: "/dashboard", texto: "Inicio" },
  { to: "/transferencias", texto: "Transferencias" },
  { to: "/cuentas", texto: "Mis cuentas" },
  { to: "/historial", texto: "Historial" },
  { to: "/limites", texto: "Límites" },
];

const claseLink = ({ isActive }) => `nav-link ${isActive ? "active" : ""}`;

export default function Layout() {
  const { usuario, logout } = useAuth();
  const { perfil, cargando } = usePerfil();
  const navigate = useNavigate();
  const [confirmando, setConfirmando] = useState(false);

  const nombreCompleto = perfil
    ? `${perfil.nombres} ${perfil.apellidos}`
    : usuario.username;

  const cerrarSesion = () => {
    logout();
    navigate("/login", { replace: true });
  };

  if (cargando) {
    return (
      <div className="pantalla-carga">
        <div className="spinner-border text-light" role="status" />
        <p className="mt-3 mb-0">Cargando tu información...</p>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">MiBilletera</div>

        <nav className="nav flex-column gap-1">
          {menu.map((item) => (
            <NavLink key={item.to} to={item.to} className={claseLink}>
              {item.texto}
            </NavLink>
          ))}
        </nav>

        <nav className="nav flex-column gap-1 mt-auto">
          <NavLink to="/perfil" className={claseLink}>Configuración</NavLink>
          <button type="button" className="nav-link" onClick={() => setConfirmando(true)}>
            Cerrar sesión
          </button>
        </nav>
      </aside>

      <main className="app-main">
        <div className="d-flex justify-content-end mb-3">
          <div className="chip-usuario">
            <span className="avatar-usuario" />
            <div className="lh-sm">
              <div>{nombreCompleto}</div>
              <small className="text-muted fw-normal">Cliente</small>
            </div>
          </div>
        </div>
        <Outlet />
      </main>

      <ConfirmModal
        abierto={confirmando}
        titulo="¿Cerrar sesión?"
        mensaje="Tendrás que ingresar tus credenciales de nuevo para volver a entrar."
        textoConfirmar="Sí, cerrar sesión"
        textoCancelar="Cancelar"
        onConfirmar={cerrarSesion}
        onCancelar={() => setConfirmando(false)}
      />
    </div>
  );
}