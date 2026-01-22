import { NavLink } from "react-router-dom";

export const Navbar = () => {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "btn btn-ghost btn-sm text-primary" : "btn btn-ghost btn-sm";

  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        <span className="text-xl font-bold ml-4">SPA-App</span>
      </div>

      <div className="flex-none gap-2">
        <NavLink to="/" className={linkClass}>
            Home
        </NavLink>

        <NavLink to="/" className={linkClass}>
            Notes
        </NavLink>

        <NavLink to="/" className={linkClass}>
            Profile
        </NavLink>

        <NavLink to="/" className={linkClass}>
            Settings
        </NavLink>
      </div>
    </div>
  );
};
