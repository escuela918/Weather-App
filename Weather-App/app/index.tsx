import React from "react";
import { View, Text, Image } from "react-native";

import { useFechas as usarFechas } from "@/src/dias/hoocks";
import NavEntreDias from "@/src/dias/index";
import usarLocalizacion from "@/src/localizacion";
import usarPronosticoClimatico from "@/src/clima/hoocks";

const TarjetaParaDatosClimaticos = (
  props: Parameters<typeof usarPronosticoClimatico>[0]
) => {
  const {
    ciudad,
    temperaturaEnGradoCelsius,
    humedadEnPorcentaje,
    velocidadDeVientoEnKilometroPorhora,
    presionEnHectopascales,
    condicionClimatica,
    temperaturaMinimaEnGradoCelsius,
    temperaturaMaximaEnGradoCelsius,
    estaPendiente,
    huboUnProblema,
    descripcionDelProblema,
  } = usarPronosticoClimatico(props);

  if (estaPendiente()) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Cargando pronóstico...</Text>
      </View>
    );
  }

  if (huboUnProblema()) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text>Error: {descripcionDelProblema()}</Text>
      </View>
    );
  }

  const obtenerIcono = () => {
    const condicion = condicionClimatica().toLowerCase();

    if (
      condicion.includes("sun") ||
      condicion.includes("clear") ||
      condicion.includes("soleado")
    ) {
      return require("../imagenes/soleado.png");
    }

    if (
      condicion.includes("rain") ||
      condicion.includes("lluv")
    ) {
      return require("../imagenes/lluvioso.png");
    }

    return require("../imagenes/nublado.png");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 24,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "900",
          letterSpacing: 2,
          marginTop: 5,
          marginBottom: 5,
        }}
      >
        {ciudad().toUpperCase()}
      </Text>

      <Image
        source={obtenerIcono()}
        resizeMode="contain"
        style={{
          width: 360,
          height: 360,
          marginBottom: -10,
        }}
      />

      <View
        style={{
          width: "100%",
          paddingLeft: 25,
          marginTop: -20,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 10,
            color: "#999",
            letterSpacing: 1,
            fontWeight: "700",
          }}
        >
          HUM
        </Text>

        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          {humedadEnPorcentaje()}%
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: "#999",
            letterSpacing: 1,
            fontWeight: "700",
          }}
        >
          PRESS
        </Text>

        <Text
          style={{
            fontSize: 16,
            marginBottom: 10,
          }}
        >
          {presionEnHectopascales()} hPa
        </Text>

        <Text
          style={{
            fontSize: 10,
            color: "#999",
            letterSpacing: 1,
            fontWeight: "700",
          }}
        >
          WIND
        </Text>

        <Text
          style={{
            fontSize: 16,
          }}
        >
          {velocidadDeVientoEnKilometroPorhora()} km/h
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          width: "100%",
          marginTop: -10,
          marginBottom: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            marginRight: 20,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              fontWeight: "700",
            }}
          >
            {temperaturaMinimaEnGradoCelsius()}°
          </Text>

          <Text
            style={{
              fontSize: 11,
              color: "#888",
            }}
          >
            MIN
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 70,
              fontWeight: "900",
              lineHeight: 100,
            }}
          >
            {temperaturaEnGradoCelsius()}°
          </Text>
        </View>

        <View
          style={{
            alignItems: "center",
            marginLeft: 30,
          }}
        >
          <Text
            style={{
              fontSize: 36,
              fontWeight: "700",
            }}
          >
            {temperaturaMaximaEnGradoCelsius()}°
          </Text>

          <Text
            style={{
              fontSize: 11,
              color: "#888",
            }}
          >
            MAX
          </Text>
        </View>
      </View>
    </View>
  );
};

const PantallaInicialParaElClima = () => {
  const {
    fechas,
    irAlDiaAnterior,
    irAlDiaSiguiente,
  } = usarFechas();

  const {
    coordenadas,
    coordenadasDisponibles,
  } = usarLocalizacion();

  const coords = coordenadas();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingTop: 15,
      }}
    >
      <NavEntreDias
        hoy={fechas().hoy}
        ayer={fechas().ayer}
        maniana={fechas().maniana}
        onAnterior={irAlDiaAnterior}
        onSiguiente={irAlDiaSiguiente}
      />

      {!coordenadasDisponibles() ? (
        <Text style={{ padding: 20 }}>
          Obteniendo ubicación...
        </Text>
      ) : !coords ? (
        <Text style={{ padding: 20 }}>
          No se pudo obtener la ubicación
        </Text>
      ) : (
        <TarjetaParaDatosClimaticos
          fecha={fechas().hoy}
          latitud={coords.latitud}
          longitud={coords.longitud}
          clave_de_api="a97cc5da0f164cca9b0213528262803"
        />
      )}
    </View>
  );
};

export default PantallaInicialParaElClima;