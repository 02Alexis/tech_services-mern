import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header
      style={{
        height: "70px",
        borderBottom: "1px solid #ddd",

        display: "flex",

        justifyContent: "space-between",

        alignItems: "center",

        padding: "0 20px",
      }}
    >
      <h3>Panel Administrativo</h3>

      <span>{user?.name}</span>
      <button onClick={handleLogout}>Salir</button>
    </header>
  );
}
