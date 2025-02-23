import DashboardLayout from "../components/DashboardLayout";

const StudentDashboard = () => {
  return (
    <DashboardLayout title="Dashboard Élève">
      <h1 className="text-2xl font-bold">Bienvenue, Élève !</h1>
      <p>Voici vos cours, exercices et suivi de progression.</p>
    </DashboardLayout>
  );
};

export default StudentDashboard;
