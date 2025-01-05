"use client";

import { useEffect } from "react";
import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import PageWrapper from "@/components/layout/page-wrapper";
import useGetProjectDetails from "@/hooks/queries/use-get-project-details";
import ProjectViewDetails from "./project-view-details.client";
import useUser from "@/providers/UserProvider";
import useToggleFavoriteProject from "@/hooks/mutations/use-toggle-favorite-project";
import { toast } from "@/hooks/use-toast";
import ProjectViewCollaboration from "./project-view-collaboration.client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteProjectDialog from "./delete-project-dialog.client";

const ProjectView = ({ projectId }: { projectId: string }) => {
  const { user } = useUser();
  const { data, error, isLoading } = useGetProjectDetails({ projectId });

  const { runMutation } = useToggleFavoriteProject({
    onSuccessCallback: () => {},
    onErrorCallback: (message) => {
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (data) {
      document.title = `${data.name}'`;
    }
  }, [data]);

  if (isLoading === true) {
    return <FetchingBlock message="Fetching project..." />;
  }

  if (error) {
    return <ErrorBlock message="Failed to fetch project" />;
  }

  if (!data) {
    return <ErrorBlock message="No project found" />;
  }

  return (
    <PageWrapper>
      <ProjectViewDetails
        project={data}
        user={user}
        toggleFavoriteCallback={() => {
          runMutation({ projectId: data.id });
        }}
      />

      <ProjectViewCollaboration project={data} user={user} />

      {/* Delete project button */}
      {data.creator.id === user?.id && (
        <Card className="w-full shadow-none">
          <CardHeader>
            <CardTitle>Delete project</CardTitle>
            <CardDescription>
              By deleting this project, you will lose all data associated with
              it. This action cannot be undone.
            </CardDescription>
            <CardContent className="w-full px-0 py-2">
              <DeleteProjectDialog projectId={data.id} />
            </CardContent>
          </CardHeader>
        </Card>
      )}
    </PageWrapper>
  );
};

export default ProjectView;
