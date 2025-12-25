import { useState } from "react";
import { login } from "../api/auth";

export default function Login({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login(username, password);
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
      setLoggedIn(true);
    } catch {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo / Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">
            OpenShelf 📚
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Digital Library Platform
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} OpenShelf
        </p>
      </div>
    </div>
  );
}
