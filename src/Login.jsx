import React, { useState } from "react";
import rolesData from "./data/roles.json";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = e => {
    e.preventDefault();
    const user = rolesData.usuarios.find(
      u => u.usuario === usuario && u.password === password
    );
    if (!user) {
      setError("Usuario o contraseña incorrectos");
      return;
    }
    const permisos = rolesData.areasTipos[user.area];

    onLogin({ usuario: user.usuario, area: user.area, permisos });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80 flex flex-col items-center">
        <img src="./src/assets/Logo.jpg" alt="Logo" className="mb-4" />

        <h2 className="text-xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        <button
          type="submit"
          className="w-full bg-[#F59527] hover:bg-[#e68320] text-white py-2 rounded transition-colors">
          Ingresar
        </button>
      </form>
    </div>
  );
}
