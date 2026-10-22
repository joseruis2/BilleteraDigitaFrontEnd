import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Dashboard from "./pages/Dashboard";
import MisCuentas from "./pages/MisCuentas";
import Perfil from "./pages/Perfil";
import Transferencias from "./pages/Transferencias";
import Historial from "./pages/Historial";
import Limites from "./pages/Limites";
import Layout from "./components/layout/Layout";
import RutaProtegida from "./components/auth/RutaProtegida";
import { PerfilProvider } from "./context/PerfilContext";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      <Route
        element={
          <RutaProtegida>
            <PerfilProvider>
              <Layout />
            </PerfilProvider>
          </RutaProtegida>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cuentas" element={<MisCuentas />} />
        <Route path="/transferencias" element={<Transferencias />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/limites" element={<Limites />} />
        <Route path="/perfil" element={<Perfil />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}