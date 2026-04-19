import { useEffect, useState } from "react";
import{requestForegroundPermissionsAsync,getCurrentPositionAsync } from 'expo-location';

export const usarLocalizacion =()=>{
    const[coordenadas, cambiarCoordenadas] = useState<{latitud:number; longitud:number}>({
        latitud: 0,
        longitud:0,
    });
    const[permiso, cambiarestadoDeLosPermisos]= useState <{habilitado: boolean}>({
        habilitado: false,
    })
    useEffect(()=>{
        async function obtenerLocalizacionActual() {
            const{status:habilitado}= await requestForegroundPermissionsAsync();
            if (habilitado!='granted'){
                return;
            }
            const localizacion = await getCurrentPositionAsync({});
            cambiarCoordenadas({
                latitud: localizacion.coords.latitude,
                longitud: localizacion.coords.longitude,
            });
            cambiarestadoDeLosPermisos({habilitado:true});
            
        }
        obtenerLocalizacionActual();
    },[]);
  return {
    coordenadas: ()=> coordenadas,
    coordenadasComoTexto: ()=>`${coordenadas.latitud},${coordenadas.longitud}`,
    coordenadasDisponibles:()=> permiso.habilitado,
  };
};

export default usarLocalizacion;