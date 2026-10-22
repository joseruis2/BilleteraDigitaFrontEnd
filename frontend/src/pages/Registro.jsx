import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registrar } from "../api/auth";
import { mensajeError } from "../api/client";
import AuthHero from "../components/auth/AuthHero";
import PasswordInput from "../components/auth/PasswordInput";
import "../styles/auth.css";

const formInicial = {
  nombres: "",
  apellidos: "",
  tipoDocumento: "DNI",
  numeroDocumento: "",
  celular: "",
  correo: "",
  username: "",
  password: "",
};

export default function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState(formInicial);
  const [confirmar, setConfirmar] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const cambiar = (campo, valor) => setForm((prev) => ({ ...prev, [campo]: valor }));
  const cambiarNumero = (campo, max, valor) =>
    cambiar(campo, valor.replace(/\D/g, "").slice(0, max));

  const passwordLarga = form.password.length >= 8;
  const coinciden = confirmar.length > 0 && form.password === confirmar;

  const validar = () => {
    if (form.numeroDocumento.length !== 8) return "El DNI debe tener 8 dígitos";
    if (form.celular.length !== 9) return "El celular debe tener 9 dígitos";
    if (!passwordLarga) return "La contraseña debe tener al menos 8 caracteres";
    if (form.password !== confirmar) return "Las contraseñas no coinciden";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorValidacion = validar();
    if (errorValidacion) {
      setError(errorValidacion);
      return;
    }
    setError("");
    setCargando(true);
    try {
      await registrar(form);
      navigate("/login", { state: { registrado: true } });
    } catch (err) {
      setError(mensajeError(err));
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        <div className="col-lg-5 d-none d-lg-block p-0">
          <AuthHero />
        </div>

        <div className="col-12 col-lg-7 d-flex align-items-center justify-content-center p-3 p-md-4">
          <div className="register-card">
            <div className="d-flex align-items-center gap-2 mb-3 d-lg-none">
              <div className="brand-logo-sm" />
              <span className="fw-bold">MiBilletera</span>
            </div>

            <h1 className="auth-title fs-2 mb-1">Crear cuenta</h1>
            <p className="register-subtitle mb-4">Regístrate para empezar a usar MiBilletera</p>

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-section-title">Datos personales</div>
              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <label htmlFor="nombres" className="form-label fw-semibold">Nombre</label>
                  <input id="nombres" className="form-control auth-input" placeholder="Ingresa tus nombres"
                    value={form.nombres} onChange={(e) => cambiar("nombres", e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="apellidos" className="form-label fw-semibold">Apellidos</label>
                  <input id="apellidos" className="form-control auth-input" placeholder="Ingresa tus apellidos"
                    value={form.apellidos} onChange={(e) => cambiar("apellidos", e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="dni" className="form-label fw-semibold">DNI</label>
                  <input id="dni" className="form-control auth-input" placeholder="8 dígitos" inputMode="numeric"
                    value={form.numeroDocumento}
                    onChange={(e) => cambiarNumero("numeroDocumento", 8, e.target.value)} required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="celular" className="form-label fw-semibold">Celular</label>
                  <input id="celular" className="form-control auth-input" placeholder="9 dígitos" inputMode="numeric"
                    value={form.celular}
                    onChange={(e) => cambiarNumero("celular", 9, e.target.value)} required />
                </div>
                <div className="col-12">
                  <label htmlFor="correo" className="form-label fw-semibold">Correo electrónico</label>
                  <input id="correo" type="email" className="form-control auth-input" placeholder="tucorreo@ejemplo.com"
                    value={form.correo} onChange={(e) => cambiar("correo", e.target.value)} required />
                </div>
              </div>

              <div className="form-section-title">Acceso a tu cuenta</div>
              <div className="row g-3">
                <div className="col-12">
                  <label htmlFor="username" className="form-label fw-semibold">Usuario</label>
                  <input id="username" className="form-control auth-input" placeholder="Elige tu usuario para iniciar sesión"
                    value={form.username} onChange={(e) => cambiar("username", e.target.value)}
                    autoComplete="username" required />
                </div>
                <div className="col-md-6">
                  <label htmlFor="password" className="form-label fw-semibold">Contraseña</label>
                  <PasswordInput id="password" placeholder="Crea tu contraseña" autoComplete="new-password"
                    value={form.password} onChange={(e) => cambiar("password", e.target.value)} />
                </div>
                <div className="col-md-6">
                  <label htmlFor="confirmar" className="form-label fw-semibold">Confirmar contraseña</label>
                  <PasswordInput id="confirmar" placeholder="Repite tu contraseña" autoComplete="new-password"
                    value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
                </div>
              </div>

              <ul className="requisitos list-unstyled mt-3 mb-0">
                <li className={passwordLarga ? "ok" : ""}>
                  {passwordLarga ? "✓" : "○"} Mínimo 8 caracteres
                </li>
                <li className={coinciden ? "ok" : ""}>
                  {coinciden ? "✓" : "○"} Las contraseñas coinciden
                </li>
              </ul>

              {error && <div className="alert alert-danger py-2 mt-3 mb-0">{error}</div>}

              <button type="submit" className="btn btn-brand w-100 mt-4" disabled={cargando}>
                {cargando ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>

            <p className="text-center mt-3 mb-0 small fw-semibold">
              ¿Ya tienes una cuenta? <Link to="/login" className="link-brand">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}