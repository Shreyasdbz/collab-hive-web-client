import AuthWrapper from "@/components/layout/auth-wrapper";
import CollaboratorProjectsSection from "@/components/pages/page-dashboard/collaborator-projects-section";
import CreatorProjectsSection from "@/components/pages/page-dashboard/creator-projects-section";

const Dashboard = () => {
  return (
    <AuthWrapper pageTitle="Dashboard" redirectHref="dashboard">
      <CreatorProjectsSection />
      <CollaboratorProjectsSection />
    </AuthWrapper>
  );
};

export default Dashboard;
