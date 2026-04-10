import { useEffect, useState } from "react";
import{requestForegroundPermissionsAsync,getCurrentPositionAsync } from 'expo-location';

export const usarLocalizacion =()=>{
    const[coordenadas, cambiarCoordenadas] = useState<{latitude:number; longitude:number}>({
        latitude: 0,
        longitude:0,
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
                latitude: localizacion.coords.latitude,
                longitude: localizacion.coords.longitude,
            });
            cambiarestadoDeLosPermisos({habilitado:true});
            
        }
        obtenerLocalizacionActual();
    },[]);
  return {
    coordenadas: ()=> coordenadas,
    coordenadasComoTexto: ()=>`${coordenadas.latitude},${coordenadas.longitude}`,
    coordenadasDisponibles:()=> permiso.habilitado,
  };
};

export default usarLocalizacion;