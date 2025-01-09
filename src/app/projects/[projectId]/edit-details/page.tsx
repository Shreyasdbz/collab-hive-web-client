import ProjectEdit from "@/components/pages/page-projects/details/project-edit.client";

const ProjectEditPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  if (!projectId) {
    return {
      notFound: true,
    };
  }

  return <ProjectEdit projectId={projectId} />;
};

export default ProjectEditPage;
