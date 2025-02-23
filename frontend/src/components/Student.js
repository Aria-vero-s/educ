import { useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "./config"; // Fichier où tu as défini l'URL du backend

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/students/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Si besoin d'un token
      }
    })
    .then(response => {
      setStudents(response.data);
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des étudiants :", error);
    });
  }, []);

  return (
    <div>
      <h2>Liste des étudiants</h2>
      <ul>
        {students.map(student => (
          <li key={student.id}>{student.username} - {student.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
