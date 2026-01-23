import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { FakeAuthProvider } from "./auth/FakeAuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <FakeAuthProvider>
        <App />
      </FakeAuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
