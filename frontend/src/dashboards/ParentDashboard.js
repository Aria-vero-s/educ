import DashboardLayout from "../components/DashboardLayout";

const ParentDashboard = () => {
  return (
    <DashboardLayout title="Dashboard Parent">
      <h1 className="text-2xl font-bold">Bienvenue, Parent !</h1>
      <p>Suivez les progrès de votre enfant et consultez les communications avec les enseignants.</p>
    </DashboardLayout>
  );
};

export default ParentDashboard;
