import React from 'react';
import LayoutParaLaPantallaPrincipalDelClima from '@/src/clima/layout';
import NavEntreDias from '@/src/dias';
import { useFechas as usarFechas } from '@/src/dias/hoocks';
import usarLocalizacion from '@/src/localizacion';
import { View, Text, Image } from 'react-native';
import usarPronosticoClimatico from '@/src/clima/hoocks';
const PantallaInicialParaElClima = () => {
  const { fechas } = usarFechas();
  const { coordenadas, coordenadasComoTexto, coordenadasDisponibles } = usarLocalizacion();

  return (
    <LayoutParaLaPantallaPrincipalDelClima>
      <NavEntreDias {...fechas()} />
      <View>
        {coordenadasDisponibles() && (
          <TarjetaParaDatosClimaticos
            fecha={fechas().hoy}
            latitud={coordenadas().latitud}
            longitud={coordenadas().longitud}
            clave_de_api={process.env.EXPO_PUBLIC_API_KEY as string}
          />
        )}
      </View>
    </LayoutParaLaPantallaPrincipalDelClima>
  );
};

const TarjetaParaDatosClimaticos = (props: Parameters<typeof usarPronosticoClimatico>[0]) => {
  const {
    ciudad,
    temperaturaEnGradoCelsius,
    humedadEnPorcentaje,
    velocidadDeVientoEnKilometroPorhora,
    presionEnHectopascales,
    condicionClimatica,
    consultaExitosa,
    temperaturaMinimaEnGradoCelsius,
    temperaturaMaximaEnGradoCelsius,
  } = usarPronosticoClimatico(props);

  if (!consultaExitosa()) return null;

  const obtenerIcono = () => {
    const condicion = condicionClimatica().toLowerCase();

    if (condicion.includes('sun') || condicion.includes('clear')) {
      return require('@/imagenes/soleado.png');
    }
    if (condicion.includes('rain')) {
      return require('@/imagenes/lluvioso.png');
    }
    if (condicion.includes('cloud')) {
      return require('@/imagenes/nublado.png');
    }

    return require('@/imagenes/nublado.png');
  };

  return (
    <View className="flex-1 items-center justify-center px-6">
      <View>
        <Text className="mb-6 items-center text-base tracking-[4px] text-gray-400">
          {ciudad().toUpperCase()}
        </Text>
        <Image source={obtenerIcono()} className="mb-6 h-44 w-44" resizeMode="contain" />
        <View className="items-baseline">
          <Text className="text-xs text-gray-400">HUM</Text>
          <Text className="text-lg">{humedadEnPorcentaje()}%</Text>
        </View>

        <View className="items-baseline">
          <Text className="text-xs text-gray-400">WIND</Text>
          <Text className="text-lg">{velocidadDeVientoEnKilometroPorhora()} km/h</Text>
        </View>

        <View className="items-baseline">
          <Text className="text-xs text-gray-400">PRESS</Text>
          <Text className="text-lg">{presionEnHectopascales()} hPa</Text>
        </View>

        <View className="mb-6 flex-row items-center">
          <Text className="text-7xl font-bold">{temperaturaMinimaEnGradoCelsius()}</Text>
          <Text className="mb-2 text-3xl">°</Text>
          <Text className="text-7xl font-bold">{temperaturaEnGradoCelsius()}</Text>
          <Text className="mb-2 text-3xl">°</Text>
          <Text className="text-7xl font-bold">{temperaturaMaximaEnGradoCelsius()}</Text>
          <Text className="mb-2 text-3xl">°</Text>
        </View>
      </View>
    </View>
  );
};
export default PantallaInicialParaElClima;
