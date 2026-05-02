import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="navbar">
      <div>
        <div className="logo">AI Task Platform</div>
        <div className="muted">Async processing with BullMQ, Redis, MongoDB</div>
      </div>

      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}