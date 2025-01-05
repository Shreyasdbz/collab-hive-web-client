"use client";

import Link from "next/link";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import ProjectDetailsCreatorPane from "./project-details-creator-pane";
import { GetProjectDetailsResponseDto } from "@/models/project-dtos";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import LeaveProjectDialog from "./leave-project-dialog.client";
import ManageCollaboratorsDialog from "./manage-collaborators-dialog.client";
import NewCollaborationJoinRequestDialogForm from "./new-collaboration-join-request-dialog-form.client";

const ProjectViewCollaboration = ({
  project,
  user,
}: {
  project: GetProjectDetailsResponseDto;
  user: User | null;
}) => {
  const collaboratorIds = project.collaborators.map(
    (collaborator) => collaborator.id
  );

  return (
    <>
      {/* Creator */}
      <ProjectDetailsCreatorPane creator={project.creator} className="w-full" />

      {/* Collaborators */}
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Collaborators</CardTitle>
          <CardDescription>
            {project.collaborators.length > 0
              ? "These are the people working on this project alongside the creator."
              : "This project doesn't have any collaborators yet."}
          </CardDescription>
        </CardHeader>
        <CardContent className="w-full flex flex-wrap gap-1">
          {project.collaborators.map((collaborator) => (
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

        {project.creator.id === user?.id && (
          <CardFooter className="">
            <ManageCollaboratorsDialog project={project} />
          </CardFooter>
        )}

        {/* Request to join button appears when:
         - The user is logged in
         - The user is not the creator of the project
          - The project is open to collaboration requests
        */}
        {user?.id &&
          project.creator.id !== user?.id &&
          project.isOpen === true &&
          !collaboratorIds.includes(user?.id || "") && (
            <CardFooter className="">
              <NewCollaborationJoinRequestDialogForm projectId={project.id} />
            </CardFooter>
          )}

        {/* Leave project button appears when:
          - The user is logged in
          - The user is a collaborator of the project
        */}
        {user?.id && collaboratorIds.includes(user.id) && (
          <CardFooter className="">
            <LeaveProjectDialog projectId={project.id} />
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default ProjectViewCollaboration;
