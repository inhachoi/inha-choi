import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "../error/ErrorBoundaryFallback";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary fallback={<ErrorBoundaryFallback />}>
        {children}
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
