import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await loginUser(form);
      setToken(res.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="auth-shell">
      <section className="card auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="muted">Login to manage AI task processing jobs.</p>

        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="button">Login</button>
        </form>

        <p className="muted">
          No account? <Link to="/register">Register</Link>
        </p>
      </section>
    </main>
  );
}