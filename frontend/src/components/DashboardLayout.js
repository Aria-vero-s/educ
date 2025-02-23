import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardLayout = ({ children, title }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-5">{title}</h2>
        <nav>
          <ul>
            <li className="mb-3"><a href="#" className="hover:underline">Accueil</a></li>
            <li className="mb-3"><a href="#" className="hover:underline">Profil</a></li>
            <li className="mb-3"><a href="#" className="hover:underline" onClick={handleLogout}>Déconnexion</a></li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
