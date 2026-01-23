import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const Navbar = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null; // or some fallback UI
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "btn btn-ghost btn-sm text-primary" : "btn btn-ghost btn-sm";

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <NavLink to="/" className="text-xl font-bold ml-4">
          SPA-App
        </NavLink>
      </div>

      <div className="flex-none gap-2">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>

        <NavLink to="/notes" className={linkClass}>
          Notes
        </NavLink>

        <NavLink to="/profile/1" className={linkClass}>
          Profile
        </NavLink>

        <NavLink to="/settings" className={linkClass}>
          Settings
        </NavLink>

        {auth.isAuthenticated ? (
          <button className="btn btn-sm btn-error ml-4" onClick={auth.logout}>
            Logout
          </button>
        ) : (
          <button className="btn btn-sm btn-success ml-4" onClick={auth.login}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};
