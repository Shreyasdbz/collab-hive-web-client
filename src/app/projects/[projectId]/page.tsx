import ProjectView from "@/components/pages/page-projects/details/project-view.client";

const ProjectDetailsPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  return <ProjectView projectId={projectId} />;
};

export default ProjectDetailsPage;
