import { render } from "@testing-library/react-native";
import NavEntreDias from "@/src/dias";

jest.mock("lucide-react-native", () => ({
  ChevronLeft: "ChevronLeft",
  ChevronRight: "ChevronRight",
}));

describe(
  "yo como usuario deseo navegar entre los dias para conocer las predicciones o datos historicos del clima",
  () => {
    test(
      "para el 9 de abril de 2026, deben aparecer 08/04, 09/04, 10/04 como en la barra de navegacion",
      () => {
        const ayer = new Date("April 8, 2026");
        const hoy = new Date("April 9, 2026");
        const maniana = new Date("April 10, 2026");

        const screen = render(
          <NavEntreDias
            hoy={hoy}
            maniana={maniana}
            ayer={ayer}
            onAnterior={() => {}}
            onSiguiente={() => {}}
          />
        );

        expect(screen.getByText("8/4")).toBeOnTheScreen();
        expect(screen.getByText("9/4")).toBeOnTheScreen();
        expect(screen.getByText("10/4")).toBeOnTheScreen();
      }
    );
  }
);