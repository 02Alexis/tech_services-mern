import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginRequest } from "../features/auth/auth.api";

import useAuthStore from "../store/authStore";

const Login = () => {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginRequest({
        email,
        password,
      });

      login(data);

      navigate("/");
    } catch {
      alert("Credenciales inválidas");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

        <input
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
