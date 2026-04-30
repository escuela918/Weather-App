import { useQuery } from '@tanstack/react-query';

export const usarPronosticoClimatico = ({
  fecha,
  latitud,
  longitud,
  clave_de_api,
}: {
  fecha: Date;
  latitud: number;
  longitud: number;
  clave_de_api: string;
}) => {
  const { isPending, isFetched, isError, error, data } = useQuery({
    queryKey: [fecha.getDate(), fecha.getHours(), latitud.toPrecision(2), longitud.toPrecision(2)],
    queryFn: async () => {
      // http://api.weatherapi.com/v1/history.json?key=key&q=London&dt=2026-04-28
      const resultadoHistorico = await fetch(
        `http://api.weatherapi.com/v1/history.json?key=${clave_de_api}&q=${latitud},${longitud}&dt${fecha}`
      );

      // http://api.weatherapi.com/v1/forecast.json?key=key&q=London&days=1&aqi=no&alerts=no
      const resultadoActual = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${clave_de_api}&q=${latitud},${longitud}&days=1&aqi=no&alerts=no`
      );

      const datosHistoricos = await resultadoHistorico.json();
      const datosActuales = await resultadoActual.json();

      console.table(datosActuales);

      return {
        historicos: datosHistoricos,
        actuales: datosActuales,
        ubicacion: datosActuales.location,
      };
    },
  });

  return {
    estaPendiente: () => isPending,
    huboUnProblema: () => isError,
    consultaExitosa: () => isFetched,
    ciudad: () => data?.ubicacion?.name ?? '',
    condicionClimatica: () => (isFetched ? `${data?.actuales?.current?.condition?.text}` : ''),
    humedadEnPorcentaje: () => (isFetched ? data?.actuales?.current?.humidity : 0),
    presionEnHectopascales: () => (isFetched ? data?.actuales?.current?.pressure_mb : 0),
    velocidadDeVientoEnKilometroPorhora: () => (isFetched ? data?.actuales?.current?.wind_kph : 0),
    temperaturaEnGradoCelsius: () => (isFetched ? data?.actuales?.current?.temp_c : 0),
    temperaturaMaximaEnGradoCelsius: () =>
      isFetched ? data?.actuales?.forecast.forecastday[0].day.maxtemp_c : 0,
    temperaturaMinimaEnGradoCelsius: () =>
      isFetched ? data?.actuales?.forecast.forecastday[0].day.mintemp_c : 0,
    descripcionDelProblema: () => (isError ? (error as Error)?.message : ''),
  };
};

export default usarPronosticoClimatico;
