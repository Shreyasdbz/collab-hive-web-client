"use client";

import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetProjectDetails from "@/hooks/queries/use-get-project-details";
import useUser from "@/providers/UserProvider";
import { useRouter } from "next/navigation";
import ProjectEditDetailsForm from "./project-edit-details-form.client";

const ProjectEdit = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const { user } = useUser();
  const { data, error, isLoading } = useGetProjectDetails({ projectId });

  if (isLoading) {
    return (
      <PageWrapper title="Edit project">
        <FetchingBlock
          className="w-full rounded-lg min-h-32"
          message="Loading project ..."
        />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper title="Edit project">
        <ErrorBlock
          className="w-full rounded-lg min-h-32"
          message="Failed to load project"
        />
      </PageWrapper>
    );
  }

  if (!user || !data) {
    return <></>;
  }

  if (data.creator.id !== user.id) {
    router.push(`/projects/${projectId}`);
  }

  return (
    <PageWrapper title="Edit project">
      {/* Details */}
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>
            Edit the details of your project like name, description,
            technologies etc.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectEditDetailsForm initialData={data} />
        </CardContent>
      </Card>
      {/* Links */}
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>
            Manage links for your project like GitHub repositories, Figma
            designs, etc.
          </CardDescription>
        </CardHeader>
        <CardContent>{/* ProjectEditLinksForm */}</CardContent>
      </Card>
    </PageWrapper>
  );
};

export default ProjectEdit;
