import DashboardLayout from "../components/DashboardLayout";

const TeacherDashboard = () => {
  return (
    <DashboardLayout title="Dashboard Enseignant">
      <h1 className="text-2xl font-bold">Bienvenue, Enseignant !</h1>
      <p>Planifiez vos cours, corrigez les devoirs et suivez la progression des élèves.</p>
    </DashboardLayout>
  );
};

export default TeacherDashboard;
