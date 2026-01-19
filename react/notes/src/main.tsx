import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NotesProvider } from "./context/NotesProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </React.StrictMode>
);
