import React from 'react'
import LayoutParaLaPantallaPrincipalDelClima from '@/src/clima/layout'
import NavEntreDias from '@/src/dias'
import { useFechas as usarFechas } from '@/src/dias/hoocks'
import usarLocalizacion from '@/src/localizacion'
import { View, Text } from 'react-native'

const PantallaInicialParaElClima = () => {
  const {fechas} =usarFechas();
  const{coordenadas, coordenadasComoTexto, coordenadasDisponibles}= usarLocalizacion();
  return (
    <LayoutParaLaPantallaPrincipalDelClima>
        <NavEntreDias {...fechas()}/>
        <View >
          {coordenadasDisponibles()&&(
            <Text className='text-4xl' >Coordenadas:{coordenadasComoTexto()}</Text>
          )}
        </View>
    </LayoutParaLaPantallaPrincipalDelClima>
  )
}

export default PantallaInicialParaElClima