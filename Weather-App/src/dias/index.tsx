import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

type Props = {
  hoy: Date;
  maniana: Date;
  ayer: Date;
  onAnterior: () => void;
  onSiguiente: () => void;
};

const NavEntreDias = ({
  hoy,
  maniana,
  ayer,
  onAnterior,
  onSiguiente,
}: Props) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        marginBottom: 20,
      }}
    >
      <Pressable
        onPress={onAnterior}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <ChevronLeft size={14} color="#BDBDBD" />

        <Text
          style={{
            fontSize: 12,
            color: "#BDBDBD",
            marginLeft: 4,
          }}
        >
          {formatearFecha(ayer)}
        </Text>
      </Pressable>

      <Text
        style={{
          fontSize: 18,
          fontWeight: "800",
          color: "#111",
        }}
      >
        {formatearFecha(hoy)}
      </Text>

      <Pressable
        onPress={onSiguiente}
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: "#BDBDBD",
            marginRight: 4,
          }}
        >
          {formatearFecha(maniana)}
        </Text>

        <ChevronRight size={14} color="#BDBDBD" />
      </Pressable>
    </View>
  );
};

const formatearFecha = (fecha: Date) => {
  return fecha.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "numeric",
  });
};

export default NavEntreDias;