import ProjectDetailsView from "@/components/pages/page-projects/project-details-view.client";

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  return <ProjectDetailsView projectId={projectId} />;
};

export default ProjectDetailsPage;
