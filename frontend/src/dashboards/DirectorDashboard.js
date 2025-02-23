import DashboardLayout from "../components/DashboardLayout";

const DirectorDashboard = () => {
  return (
    <DashboardLayout title="Dashboard Directeur">
      <h1 className="text-2xl font-bold">Bienvenue, Directeur !</h1>
      <p>Gérez l'école, les enseignants et la communication avec les parents.</p>
    </DashboardLayout>
  );
};

export default DirectorDashboard;
