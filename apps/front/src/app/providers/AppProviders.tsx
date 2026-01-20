import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "../error/ErrorBoundaryFallback";
import { OverlayProvider } from "overlay-kit";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
          {children}
        </ErrorBoundary>
      </OverlayProvider>
    </QueryClientProvider>
  );
}
