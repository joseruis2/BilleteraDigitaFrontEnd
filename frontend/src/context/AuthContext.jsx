import { createContext, useContext, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  const login = async (username, password) => {
    const { data } = await api.post("/api/auth/login", { username, password });
    // data = { tokenType, accessToken, expiresIn, username, rol }
    localStorage.setItem("accessToken", data.accessToken);
    const datosUsuario = { username: data.username, rol: data.rol };
    localStorage.setItem("usuario", JSON.stringify(datosUsuario));
    setUsuario(datosUsuario);
  };

  const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("usuario");
  setUsuario(null);
};

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

