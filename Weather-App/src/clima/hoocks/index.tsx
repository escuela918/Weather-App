import { useQuery } from "@tanstack/react-query";

type Props = {
  fecha: Date;
  latitud: number;
  longitud: number;
  clave_de_api: string;
};

export const usarPronosticoClimatico = ({
  fecha,
  latitud,
  longitud,
  clave_de_api,
}: Props) => {
  const fechaFormateada = fecha.toISOString().split("T")[0];

  const { isPending, isFetched, isError, error, data } = useQuery({
    queryKey: ["clima", fechaFormateada, latitud, longitud],

    queryFn: async () => {
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      const fechaConsultada = new Date(fecha);
      fechaConsultada.setHours(0, 0, 0, 0);

      const esHistorica = fechaConsultada < hoy;

      if (esHistorica) {
        const respuesta = await fetch(
          `https://api.weatherapi.com/v1/history.json?key=${clave_de_api}&q=${latitud},${longitud}&dt=${fechaFormateada}`
        );

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el historial climático");
        }

        const datos = await respuesta.json();

        return {
          ubicacion: datos.location,
          temperaturaActual:
            datos.forecast.forecastday?.[0]?.day?.avgtemp_c ?? 0,
          temperaturaMaxima:
            datos.forecast.forecastday?.[0]?.day?.maxtemp_c ?? 0,
          temperaturaMinima:
            datos.forecast.forecastday?.[0]?.day?.mintemp_c ?? 0,
          humedad:
            datos.forecast.forecastday?.[0]?.day?.avghumidity ?? 0,
          condicion:
            datos.forecast.forecastday?.[0]?.day?.condition?.text ?? "",
          velocidadViento:
            datos.forecast.forecastday?.[0]?.day?.maxwind_kph ?? 0,
          presion: 0,
        };
      }

      const respuesta = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${latitud},${longitud}&days=3&aqi=no&alerts=no`
      );

      if (!respuesta.ok) {
        throw new Error("No se pudo obtener el pronóstico");
      }

      const datos = await respuesta.json();

      const diaSeleccionado = datos.forecast.forecastday.find(
        (dia: any) => dia.date === fechaFormateada
      );

      return {
        ubicacion: datos.location,
        temperaturaActual:
          diaSeleccionado?.day?.avgtemp_c ??
          datos.current?.temp_c ??
          0,
        temperaturaMaxima:
          diaSeleccionado?.day?.maxtemp_c ?? 0,
        temperaturaMinima:
          diaSeleccionado?.day?.mintemp_c ?? 0,
        humedad:
          datos.current?.humidity ??
          diaSeleccionado?.day?.avghumidity ??
          0,
        condicion:
          diaSeleccionado?.day?.condition?.text ??
          datos.current?.condition?.text ??
          "",
        velocidadViento:
          datos.current?.wind_kph ??
          diaSeleccionado?.day?.maxwind_kph ??
          0,
        presion: datos.current?.pressure_mb ?? 0,
      };
    },

    placeholderData: (anterior) => anterior,
  });

  return {
    estaPendiente: () => isPending,
    huboUnProblema: () => isError,
    consultaExitosa: () => isFetched,

    ciudad: () => data?.ubicacion?.name ?? "",

    condicionClimatica: () => data?.condicion ?? "",

    humedadEnPorcentaje: () => data?.humedad ?? 0,

    presionEnHectopascales: () => data?.presion ?? 0,

    velocidadDeVientoEnKilometroPorhora: () =>
      data?.velocidadViento ?? 0,

    temperaturaEnGradoCelsius: () =>
      data?.temperaturaActual ?? 0,

    temperaturaMaximaEnGradoCelsius: () =>
      data?.temperaturaMaxima ?? 0,

    temperaturaMinimaEnGradoCelsius: () =>
      data?.temperaturaMinima ?? 0,

    descripcionDelProblema: () =>
      isError ? (error as Error)?.message : "",
  };
};

export default usarPronosticoClimatico;