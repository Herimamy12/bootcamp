// URL de base de l'API backend.
// En production (Render), VITE_API_URL est defini dans les variables d'environnement.
// En developpement local, on utilise http://localhost:3000 par defaut.
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";
