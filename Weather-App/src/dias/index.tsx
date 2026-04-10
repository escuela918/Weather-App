import { Icon } from "@/components/ui/icon"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { Text } from "@/components/ui/text"
import { View } from "react-native"

const NavEntreDias = ({hoy,maniana,ayer}:{hoy:Date; maniana:Date; ayer:Date}) => {
  return (
    <View className="flex-row justify-between">
        <View className="flex-row items-center space-x-2">
            <Icon as ={ChevronLeft}/>
            <Text>{formatear_fechas(ayer)}</Text>
        </View>
        <View>
            <Text className="txt-xl font-bold">{formatear_fechas(hoy)}</Text>
        </View>
        <View className="flex-row items-center space-x-2">
            <Icon as={ChevronRight}/>
            <Text>{formatear_fechas(maniana)}</Text>
        </View>
    </View>
  )
}
const formatear_fechas= (fecha:Date)=>{
    const fechas_con_formato= fecha.toLocaleString('es-AR',{day:'2-digit',month:'2-digit'});
    return fechas_con_formato.replace(`/${fecha.getFullYear()}`,``)
};
export default NavEntreDias