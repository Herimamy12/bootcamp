import { ListTodo, LogIn, LogOut, UserPlus } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <div className="fixed top-0 z-50 w-full">
      <div className="container mx-auto">
        <div className="flex justify-between items-center max-w-7xl mx-auto h-16">
          <Link
            to="/"
            className="flex gap-2 items-center hover:opacity-80 transition-opacity"
          >
            <div className="badge badge-accent badge-lg rounded-none h-8 flex items-center justify-center">
              <ListTodo />
            </div>
            <h1 className="text-2xl font-bold">
              ToDo<span className="text-accent">App</span>
            </h1>
          </Link>
          <div className="flex gap-4 items-center">
            {isLoggedIn ? (
              <>
                <span className="text-sm text-base-content/70">
                  <span className="font-semibold">{user?.name}</span>
                </span>
                <button
                  className="btn rounded-none btn-ghost btn-outline"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn rounded-none btn-ghost btn-outline"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Se connecter
                </Link>
                <Link to="/signup" className="btn rounded-none btn-accent">
                  <UserPlus className="w-4 h-4 mr-2" />
                  S'inscrire
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
