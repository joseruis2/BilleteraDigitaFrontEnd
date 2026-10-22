import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mensajeError } from "../api/client";
import AuthHero from "../components/auth/AuthHero";
import PasswordInput from "../components/auth/PasswordInput";
import "../styles/auth.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cargando) return;
    setError("");
    setCargando(true);
    try {
      await login(username, password);
      navigate("/dashboard");
    } catch (err) {
      setError(mensajeError(err));
      setCargando(false);
    }
  };

  return (
    <div className="container-fluid">
      {cargando && (
        <div className="overlay-carga" role="status" aria-live="polite">
          <div className="spinner-border text-light" />
          <p className="mt-3 mb-0 fw-semibold">Iniciando sesión...</p>
        </div>
      )}

      <div className="row min-vh-100">
        <div className="col-lg-6 d-none d-lg-block p-0">
          <AuthHero />
        </div>

        <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center p-4">
          <div style={{ maxWidth: 400, width: "100%" }}>
            <div className="d-flex align-items-center gap-2 mb-4 d-lg-none">
              <div className="brand-logo-sm" />
              <span className="fw-bold">MiBilletera</span>
            </div>

            <h1 className="auth-title text-center mb-1">Bienvenido de nuevo</h1>
            <p className="text-muted text-center mb-4">
              Inicia sesión para continuar con tu cuenta.
            </p>

            {location.state?.registrado && (
              <div className="alert alert-success py-2">
                Cuenta creada. Ya puedes iniciar sesión.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold">Usuario</label>
                <input
                  id="username"
                  className="form-control auth-input"
                  placeholder="Ingresa tu usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                <PasswordInput
                  id="password"
                  placeholder="Ingresa tu contraseña"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <button type="submit" className="btn btn-brand w-100 mt-2" disabled={cargando}>
                {cargando ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                    Ingresando...
                  </>
                ) : (
                  "Iniciar sesión"
                )}
              </button>
            </form>

            <p className="text-center mt-4 mb-0 small fw-semibold">
              ¿No tienes una cuenta? <Link to="/registro" className="link-brand">Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}