import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import App from "./App";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ScrollToTop />
        <App />
      </QueryClientProvider>
      <Toaster position="bottom-right" reverseOrder={true} />
    </BrowserRouter>
  </StrictMode>,
);
