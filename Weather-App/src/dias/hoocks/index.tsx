import { useState } from "react";

export const useFechas = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());

  const ayer = new Date(fechaSeleccionada);
  ayer.setDate(ayer.getDate() - 1);

  const maniana = new Date(fechaSeleccionada);
  maniana.setDate(maniana.getDate() + 1);

  return {
    fechas: () => ({
      hoy: fechaSeleccionada,
      ayer,
      maniana,
    }),

    irAlDiaAnterior: () => {
      setFechaSeleccionada((actual) => {
        const nueva = new Date(actual);
        nueva.setDate(nueva.getDate() - 1);
        return nueva;
      });
    },

    irAlDiaSiguiente: () => {
      setFechaSeleccionada((actual) => {
        const nueva = new Date(actual);
        nueva.setDate(nueva.getDate() + 1);
        return nueva;
      });
    },
  };
};