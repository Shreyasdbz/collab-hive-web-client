"use client";

import { useState } from "react";
import useUser from "@/providers/UserProvider";
import PageWrapper from "@/components/layout/page-wrapper";
import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import ProjectDetailsCreatorPane from "./project-details-creator-pane";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import {
  ProjectComplexitiesMapping,
  ProjectRolesMapping,
  ProjectTechnologiesMapping,
} from "@/models/project-mappings";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { CircleCheck, CircleMinus, Heart, UserCircle } from "lucide-react";
import NewCollaborationJoinRequestDialogForm from "./new-collaboration-join-request-dialog-form.client";
import ManageCollaboratorsDialog from "./manage-collaborators-dialog.client";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import LeaveProjectDialog from "./leave-project-dialog.client";
import DeleteProjectDialog from "./delete-project-dialog.client";
import useGetProjectDetails from "@/hooks/queries/use-get-project-details";
import { MutedText } from "@/components/ui/typography/muted-text";
import useToggleFavoriteProject from "@/hooks/mutations/use-toggle-favorite-project";
import { toast } from "@/hooks/use-toast";

const ProjectDetailsView = ({ projectId }: { projectId: string }) => {
  const { user } = useUser();
  const { data, error, isLoading } = useGetProjectDetails({ projectId });
  const [collaboratorIds, setCollaboratorIds] = useState(
    data?.collaborators.map((col) => col.id) || []
  );

  const { runMutation } = useToggleFavoriteProject({
    onSuccessCallback: () => {},
    onErrorCallback: (message) => {
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  function toggleFavorite() {
    runMutation({ projectId });
  }

  const FavoriteSection = () => {
    return (
      <Label className="w-full flex items-center justify-start space-x-1">
        <Button
          variant={"ghost"}
          className={cn(
            "rounded-lg text-sm shadow-none text-red-500 hover:bg-red-200 hover:text-red-600 px-4 py-0",
            data?.userHasFavorited ? "text-red-600" : ""
          )}
          onClick={toggleFavorite}
        >
          {data?.userHasFavorited ? (
            <Heart size={16} fill="#dc2626" />
          ) : (
            <Heart size={16} />
          )}
          {data?.favoriteCount}
        </Button>
        <MutedText>people have favorited this project</MutedText>
      </Label>
    );
  };

  const DescriptionSection = ({ description }: { description: string }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Description</Label>
        <p>
          {description && description.length > 0
            ? description
            : "This project doesn't have a description yet"}
        </p>
      </div>
    );
  };

  const ComplexitySection = ({ complexity }: { complexity: string }) => {
    const complexityString = ProjectComplexitiesMapping.get(complexity);

    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Complexity</Label>
        <p>
          {`This project is of `}
          <span className="font-medium">{complexityString}</span>
          {` complexity`}
        </p>
      </div>
    );
  };

  const TechnologiesSection = ({
    technologies,
  }: {
    technologies: string[];
  }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Technologies used</Label>
        <div className="w-full flex flex-wrap gap-1">
          {technologies.map((tech, index) => (
            <Badge
              key={index}
              variant={"outlineStrong"}
              className="font-normal rounded-full text-sm"
            >
              {ProjectTechnologiesMapping.get(tech)}
            </Badge>
          ))}
          {technologies.length === 0 && (
            <span>
              This project doesn&apos;t have any technologies listed yet.
            </span>
          )}
        </div>
      </div>
    );
  };

  const RolesSection = ({ roles }: { roles: string[] }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Roles open</Label>
        <div className="w-full flex flex-wrap gap-1">
          {roles.map((role, index) => (
            <Badge
              key={index}
              variant={"outlineStrong"}
              className="font-normal rounded-full text-sm"
            >
              {ProjectRolesMapping.get(role)}
            </Badge>
          ))}
          {roles.length === 0 && (
            <span>
              This project isn&apos;t looking for any specific roles right now.
            </span>
          )}
        </div>
      </div>
    );
  };

  const LinksSection = ({ links }: { links: string[] }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Links</Label>
        <div className="w-full flex flex-wrap gap-1">
          {links.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {link}
            </a>
          ))}
          {links.length === 0 && (
            <span>
              This project doesn&apos;t have any links to external resources.
            </span>
          )}
        </div>
      </div>
    );
  };

  const CollaborationStatusSection = ({ isOpen }: { isOpen: boolean }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Collaboration status</Label>
        <div>
          <Badge
            className="gap-1"
            variant={
              isOpen === true ? "collaborationActive" : "collaborationInactive"
            }
          >
            {isOpen === true ? (
              <CircleCheck size={14} />
            ) : (
              <CircleMinus size={14} />
            )}
            {isOpen === true
              ? "Open to collaboration requests"
              : "Closed to collaboration requests"}
          </Badge>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (data) {
      document.title = data.name;
      setCollaboratorIds(data.collaborators.map((col) => col.id));
    }
  }, [data]);

  if (isLoading === true && !data && !error) {
    return (
      <PageWrapper title="Project details">
        <FetchingBlock
          message="Loading the project ..."
          className="h-20 rounded-lg w-full"
        />
      </PageWrapper>
    );
  }

  if (error && !data && isLoading === false) {
    return (
      <PageWrapper title="Project details">
        <ErrorBlock
          message="An error occurred while fetching the project"
          className="h-20 rounded-lg w-full"
        />
      </PageWrapper>
    );
  }

  if (!data) {
    return <></>;
  }

  return (
    <PageWrapper
      title={data.name}
      className="flex flex-col items-center justify-center w-full space-y-4"
    >
      {/* Details */}
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>
            General information about the project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FavoriteSection />
          <DescriptionSection description={data.description} />
          <ComplexitySection complexity={data.complexity} />
          <TechnologiesSection technologies={data.technologies} />
          <RolesSection roles={data.roles} />
          <LinksSection links={[]} />
          <CollaborationStatusSection isOpen={data.isOpen} />
        </CardContent>
        {data.creator.id === user?.id && (
          <CardFooter className="">
            <Link href={`/projects/${projectId}/edit-details`}>
              <Button variant={"outline"}>Edit details</Button>
            </Link>
          </CardFooter>
        )}
      </Card>

      {/* Creator */}
      <ProjectDetailsCreatorPane creator={data.creator} className="w-full" />

      {/* Collaborators */}
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Collaborators</CardTitle>
          <CardDescription>
            {data.collaborators.length > 0
              ? "These are the people working on this project alongside the creator."
              : "This project doesn't have any collaborators yet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-wrap gap-1">
          {data.collaborators.map((collaborator) => (
            <Link
              key={collaborator.id}
              href={`/profile/${collaborator.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant={"outline"} className="rounded-full">
                {collaborator.avatarUrl ? (
                  <Image
                    src={collaborator.avatarUrl}
                    alt={`${collaborator.name}'s avatar`}
                    height={24}
                    width={24}
                    className="rounded-full shadow-sm"
                  />
                ) : (
                  <UserCircle size={24} />
                )}
                {collaborator.id === user?.id ? "You" : collaborator.name}
              </Button>
            </Link>
          ))}
        </CardContent>

        {data.creator.id === user?.id && (
          <CardFooter className="">
            <ManageCollaboratorsDialog project={data} />
          </CardFooter>
        )}

        {/* Request to join button appears when:
         - The user is logged in
         - The user is not the creator of the project
          - The project is open to collaboration requests
        */}
        {user?.id &&
          data.creator.id !== user?.id &&
          data.isOpen === true &&
          !collaboratorIds.includes(user?.id || "") && (
            <CardFooter className="">
              <NewCollaborationJoinRequestDialogForm projectId={data.id} />
            </CardFooter>
          )}

        {/* Leave project button appears when:
          - The user is logged in
          - The user is a collaborator of the project
        */}
        {user?.id && collaboratorIds.includes(user.id) && (
          <CardFooter className="">
            <LeaveProjectDialog projectId={data.id} />
          </CardFooter>
        )}
      </Card>

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

export default ProjectDetailsView;
