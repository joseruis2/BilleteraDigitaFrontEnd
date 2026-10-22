import { createContext, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { obtenerPerfil } from "../api/perfil";

const PerfilContext = createContext(null);

export function PerfilProvider({ children }) {
  const { data, cargando, error } = useFetch(obtenerPerfil);
  return (
    <PerfilContext.Provider value={{ perfil: data, cargando, error }}>
      {children}
    </PerfilContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePerfil = () => useContext(PerfilContext);