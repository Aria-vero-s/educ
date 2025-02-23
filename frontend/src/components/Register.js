import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "eleve"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("🔵 Envoi des données d'inscription :", formData);
            const response = await api.post("/register/", formData);
            console.log("✅ Réponse de l'API (Inscription) :", response.data);
    
            if (response.data.message === "Inscription réussie") {
                console.log("✅ Inscription réussie !");
    
                // 🔄 Attendre 2 secondes avant de tenter la connexion automatique
                setTimeout(async () => {
                    try {
                        // IMPORTANT : utiliser formData.username au lieu de formData.email
                        await loginUser(formData.username, formData.password);
                    } catch (error) {
                        console.error("🚨 Connexion automatique échouée :", error.response?.data || error.message);
                        alert("Échec de la connexion automatique. Veuillez vous connecter manuellement.");
                        navigate("/");
                    }
                }, 2000);
            }
        } catch (error) {
            console.error("🚨 Erreur lors de l'inscription :", error.response?.data || error.message);
    
            if (error.response?.data?.error === "Utilisateur déjà existant") {
                alert("Cet utilisateur existe déjà. Essayez de vous connecter !");
                navigate("/");
            } else {
                alert("Erreur lors de la création de l'utilisateur.");
            }
        }
    };
    
    const loginUser = async (username, password) => {
        try {
            console.log("🔵 Tentative de connexion avec :", { username, password });
            const loginResponse = await api.post("/login/", { username, password });
            console.log("✅ Connexion réussie :", loginResponse.data);
    
            if (loginResponse.data.token) {
                localStorage.setItem("token", loginResponse.data.token);
                localStorage.setItem("role", loginResponse.data.role);
                alert("Bienvenue !");
    
                // Redirection selon le rôle, identique à la page Login
                switch (loginResponse.data.role) {
                    case "student":
                    case "eleve":
                        navigate("/dashboard/student");
                        break;
                    case "teacher":
                    case "enseignant":
                        navigate("/dashboard/teacher");
                        break;
                    case "parent":
                        navigate("/dashboard/parent");
                        break;
                    case "director":
                    case "directeur":
                        navigate("/dashboard/director");
                        break;
                    case "secretary":
                    case "secretaire":
                        navigate("/dashboard/secretary");
                        break;
                    default:
                        navigate("/dashboard/other");
                        break;
                }
            } else {
                alert("Erreur lors de la connexion automatique.");
                navigate("/");
            }
        } catch (error) {
            console.error("🚨 Erreur lors de la connexion :", error.response?.data || error.message);
            alert("Connexion automatique échouée : " + (error.response?.data?.detail || "Erreur inconnue"));
            navigate("/");
        }
    };    

    return (
        <div style={{ maxWidth: "300px", margin: "50px auto", textAlign: "center" }}>
            <h2>Créer un compte</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Nom d'utilisateur" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Mot de passe" onChange={handleChange} required />
                <select name="role" onChange={handleChange}>
                    <option value="eleve">Élève</option>
                    <option value="enseignant">Enseignant</option>
                    <option value="parent">Parent</option>
                    <option value="directeur">Directeur</option>
                    <option value="secretaire">Secrétaire</option>
                    <option value="employe">Employé</option>
                </select>
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;
