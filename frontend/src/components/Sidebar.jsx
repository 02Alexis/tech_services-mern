import { LayoutDashboard, Wrench, Users, Cpu, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function Sidebar() {
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition
      ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800"
      }`;

  return (
    <aside
      className="
        w-64
        bg-slate-900
        text-white
        flex
        flex-col
      "
    >
      <div
        className="
          p-6
          border-b
          border-slate-800
        "
      >
        <h2
          className="
            text-xl
            font-bold
          "
        >
          Tech Services
        </h2>
      </div>

      <nav
        className="
          flex-1
          p-4
          space-y-2
        "
      >
        <NavLink to="/" className={linkClass}>
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink to="/services" className={linkClass}>
          <Wrench size={18} />
          Servicios
        </NavLink>

        <NavLink to="/equipment-types" className={linkClass}>
          <Cpu size={18} />
          Tipos Equipo
        </NavLink>

        <NavLink to="/users" className={linkClass}>
          <Users size={18} />
          Usuarios
        </NavLink>
      </nav>

      <div
        className="
          p-4
          border-t
          border-slate-800
        "
      >
        <button
          onClick={handleLogout}
          className="
            w-full
            flex
            items-center
            gap-3
            px-4
            py-3
            rounded-lg
            text-red-400
            hover:bg-slate-800
          "
        >
          <LogOut size={18} />
          Salir
        </button>
      </div>
    </aside>
  );
}
