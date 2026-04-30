import { useEffect, useState } from 'react';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

export const usarLocalizacion = () => {
  const [coordenadas, cambiarCoordenadas] = useState<{ latitud: number; longitud: number }>({
    latitud: 0,
    longitud: 0,
  });
  const [permiso, cambiarestadoDeLosPermisos] = useState<{ habilitado: boolean }>({
    habilitado: false,
  });
  useEffect(() => {
    async function obtenerLocalizacionActual() {
      const { status: habilitado } = await requestForegroundPermissionsAsync();
      if (habilitado != 'granted') {
        return;
      }
      const localizacion = await getCurrentPositionAsync({});
      console.log(localizacion);
      cambiarCoordenadas({
        // latitud: localizacion.coords.latitude,
        // longitud: localizacion.coords.longitude,
        latitud: 34.6798243,
        longitud: -58.4511093,
      });
      cambiarestadoDeLosPermisos({ habilitado: true });
    }
    try {
      obtenerLocalizacionActual();
    } catch {
      console.log('hubo un problema pero tiro datos por defecto');

      cambiarCoordenadas({
        // latitud: localizacion.coords.latitude,
        // longitud: localizacion.coords.longitude,
        latitud: 34.6798243,
        longitud: -58.4511093,
      });
      cambiarestadoDeLosPermisos({ habilitado: true });
    }
  }, []);
  return {
    coordenadas: () => coordenadas,
    coordenadasComoTexto: () => `${coordenadas.latitud},${coordenadas.longitud}`,
    coordenadasDisponibles: () => permiso.habilitado,
  };
};

export default usarLocalizacion;

