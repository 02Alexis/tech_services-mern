import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside
      style={{
        width: "240px",
        background: "var(--color-primary)",
        color: "white",
        padding: "20px",
      }}
    >
      <h2>Tech Services</h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <Link to="/">Dashboard</Link>

        <Link to="/services">Servicios</Link>

        <Link to="/equipment-types">Tipos Equipo</Link>

        <Link to="/users">Usuarios</Link>
      </nav>
    </aside>
  );
}
