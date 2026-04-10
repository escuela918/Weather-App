import usarLocalizacion from '@/src/localizacion';
import { renderHook, waitFor } from '@testing-library/react-native';


jest.mock('expo-location',()=>{
    const obtenerLocalizacionActualFalsa= jest.fn(async()=>{
        await new Promise((resolve) => setTimeout(resolve,100));
        return {coords:{latitude:10, longitude:20}};
    });
    const solicitarPermisoDeLocalizacionFalsa=jest.fn(async()=>{
        await new Promise((resolve) => setTimeout(resolve,100));
        return {status: 'granted'};

    });
    return{
        requestForegroundPermissionsAsync: solicitarPermisoDeLocalizacionFalsa,
        getCurrentPositionAsync: obtenerLocalizacionActualFalsa
    };

})

describe('yo como usuario quiero visualizar los datos del clima de la fecha para saber vestirme ', () => {
  test('el primer dato a visualizar en la aplicacion  debe ser el nombre de la ciudad: Quilmes ', async () => {
    const resultado= renderHook(()=> usarLocalizacion());
    expect(resultado.result.current.coordenadas()).toEqual({
        latitude:0,
        longitude:0,
    });
    await waitFor(()=>{
        expect(resultado.result.current.coordenadas()).toEqual({
            latitude:10,
            longitude:20,
        });
    });
  });
});
