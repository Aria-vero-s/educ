import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import DashboardLayout from "./components/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import StudentDashboard from "./dashboards/StudentDashboard";
import TeacherDashboard from "./dashboards/TeacherDashboard";
import ParentDashboard from "./dashboards/ParentDashboard";
import DirectorDashboard from "./dashboards/DirectorDashboard";
import SecretaryDashboard from "./dashboards/SecretaryDashboard";
import OtherDashboard from "./dashboards/OtherDashboard";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const enterFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch((err) => {
          console.error("Fullscreen request denied:", err);
        });
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen().catch((err) => {
          console.error("Fullscreen request denied:", err);
        });
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen().catch((err) => {
          console.error("Fullscreen request denied:", err);
        });
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen().catch((err) => {
          console.error("Fullscreen request denied:", err);
        });
      }
    };

    const blockKeys = (e) => {
      const blockedKeys = ["Escape", "F11", "Alt", "Tab"];
      if (blockedKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    // Ajouter un event listener après l'entrée en plein écran
    document.addEventListener("fullscreenchange", () => {
      if (document.fullscreenElement) {
        document.addEventListener("keydown", blockKeys);
      } else {
        document.removeEventListener("keydown", blockKeys);
      }
    });

    return () => {
      document.removeEventListener("fullscreenchange", blockKeys);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  return (
    <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Ajout de la route */}
        <Route path="/dashboardlayout" element={<DashboardLayout />} />
        <Route path="/dashboard/student" element={<ProtectedRoute element={<StudentDashboard />} allowedRoles={["student"]} />} />
        <Route path="/dashboard/teacher" element={<ProtectedRoute element={<TeacherDashboard />} allowedRoles={["teacher"]} />} />
        <Route path="/dashboard/parent" element={<ProtectedRoute element={<ParentDashboard />} allowedRoles={["parent"]} />} />
        <Route path="/dashboard/director" element={<ProtectedRoute element={<DirectorDashboard />} allowedRoles={["director"]} />} />
        <Route path="/dashboard/secretary" element={<ProtectedRoute element={<SecretaryDashboard />} allowedRoles={["secretary"]} />} />
        <Route path="/dashboard/other" element={<ProtectedRoute element={<OtherDashboard />} allowedRoles={["other"]} />} />
        </Routes>
    </Router>
  );
}

export default App;
