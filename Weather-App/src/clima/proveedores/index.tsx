import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clienteDeDatosClimaticos = new QueryClient();

const ProveedorDeDatosClimatico =({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={clienteDeDatosClimaticos}>{ children }</QueryClientProvider>;
};
export default ProveedorDeDatosClimatico;