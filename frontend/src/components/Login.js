import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // Import du fichier CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
      
        // Redirection according to role
        switch (data.role) {
          case "student":
            navigate("/dashboard/student");
            break;
          case "teacher":
            navigate("/dashboard/teacher");
            break;
          case "parent":
            navigate("/dashboard/parent");
            break;
          case "director":
            navigate("/dashboard/director");
            break;
          case "secretary":
            navigate("/dashboard/secretary");
            break;
          default:
            navigate("/dashboard/other");
            break;
        }
      } else {
        setError(data.error || "Erreur de connexion");
      }
      
    } catch (error) {
      setError("Erreur réseau");
    }
  };

  return (
    <div className="login-container">
      {/* Section gauche : Formulaire */}
      <div className="login-form">
        <h2 className="title">Connexion</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>
        <p className="register-link">
          Pas encore de compte ?{" "}
          <Link to="/register" className="text-blue">
            Créer un compte
          </Link>
        </p>
      </div>

      {/* Section droite : Image */}
      <div className="login-image"></div>
    </div>
  );
};

export default Login;
