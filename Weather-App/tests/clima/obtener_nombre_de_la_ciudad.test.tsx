import usarPronosticoClimatico from '@/src/clima/hoocks';
import ProveedorDeDatosClimatico from '@/src/clima/proveedores';
import { renderHook, waitFor } from '@testing-library/react-native';

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        location: {
          name: "Quilmes",
          region: "Ile-de-France",
          country: "France",
        },
        current: {
          temp_c: 9.2,
          humidity: 93,
          pressure_mb: 1027,
          wind_kph: 6.1,
          condition: {
            text: "clear",
          },
        },
        forecast: {
          forecastday: [
            {
              date: new Date().toISOString().split("T")[0],
              day: {
                avgtemp_c: 9.2,
                maxtemp_c: 15,
                mintemp_c: 7,
                avghumidity: 93,
                maxwind_kph: 6.1,
                condition: {
                  text: "clear",
                },
              },
            },
          ],
        },
      }),
  })
) as jest.Mock;
describe('yo como usuario quiero ver el nombre de la ciudad para asegurarme que los datos climaticos estan ligados con la zona ', () => {
  test('el primer dato a visualizar en la aplicacion  debe ser el nombre de la ciudad: Quilmes ', async () => {
    const resultado= renderHook(
        ()=>
             usarPronosticoClimatico({
                fecha: new Date(),
                latitud: -30,
                longitud:-60,
                clave_de_api:'api_key_123',
             }),
        {
            wrapper: ProveedorDeDatosClimatico,
        }
    );
    expect(resultado.result.current.ciudad()).toBe('')

    await waitFor(()=>{
        expect(resultado.result.current.ciudad()).toEqual('Quilmes')

    });
  });
});
