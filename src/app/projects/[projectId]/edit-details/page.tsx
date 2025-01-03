import ProjectDetailsEditForm from "@/components/pages/page-projects/project-details-edit-form.client";

const ProjectEditPage = async ({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) => {
  const projectId = (await params).projectId;

  return <ProjectDetailsEditForm projectId={projectId} />;
};

export default ProjectEditPage;
