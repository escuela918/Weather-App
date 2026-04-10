import '@/global.css';

import ProveedorDeTemasClaroOscuro from '@/src/tema-claro-oscuro';
import { StackPrincipal } from '@/src/stacks';
import FeedbacksDeErrorPorDefecto from '@/src/feedbacks';
import { PortalHost } from '@rn-primitives/portal';

export const ErrorBoundary = FeedbacksDeErrorPorDefecto;

export default function RootLayout() {
  return (
    <ProveedorDeTemasClaroOscuro>
      <StackPrincipal />
      <PortalHost/>
    </ProveedorDeTemasClaroOscuro>
  );
}