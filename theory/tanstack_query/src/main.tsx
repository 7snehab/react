import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

//the queryCLient is the cache , one per app
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 100 * 30, // data counts as fresh for 30s -no refetch in that window
      retry: 1, // retry a failed fetch once(default is 3)
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
