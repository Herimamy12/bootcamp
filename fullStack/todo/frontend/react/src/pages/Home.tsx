import { LogIn, UserPlus } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="flex justify-center min-w-screen flex-col gap-4 min-h-screen items-center bg-linear-to-br from-base-300 via-gray-900 to-base-300">
      <Navbar />
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-bold md:text-6xl text-4xl">
          Welcome to <span className="text-accent">ToDoApp</span>
        </h1>
        {isLoggedIn ? (
          <>
            <p className="text-lg mt-4 text-success">
              Bienvenue, {user?.name} ! Gérez vos tâches efficacement.
            </p>
            <div className="flex gap-4">
              <button className="btn btn-accent rounded-none md:btn-lg">
                Voir mes tâches
              </button>
              <button className="btn btn-outline rounded-none md:btn-lg">
                Créer une tâche
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg mt-4 text-error max-w-7xl text-center mx-10">
              Votre application personnelle de gestion des tâches. Connectez-vous ou inscrivez-vous pour commencer !
            </p>
            <div className="flex gap-4">
              <Link
                to="/login"
                className="btn btn-outline rounded-none md:btn-lg"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Se connecter
              </Link>
              <Link
                to="/signup"
                className="btn btn-accent rounded-none md:btn-lg"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                S'inscrire
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
