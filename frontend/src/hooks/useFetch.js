import { useEffect, useState } from "react";

// Recibe una función que devuelve una promesa de axios.
// La función debe ser estable (definida fuera del componente).
export default function useFetch(peticion) {
  const [data, setData] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;
    peticion()
      .then((res) => {
        if (!cancelado) setData(res.data);
      })
      .catch((err) => {
        if (!cancelado) setError(err);
      })
      .finally(() => {
        if (!cancelado) setCargando(false);
      });
    return () => {
      cancelado = true;
    };
  }, [peticion]);

  return { data, cargando, error };
}