"use client";

import { useState } from "react";
import Image from "next/image";
import { GetProjectDetailsResponseDto } from "@/models/project-dtos";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MutedText } from "@/components/ui/typography/muted-text";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUpRight, Ban, Check, UserCircle, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import useManageCollaborationRequests from "@/hooks/mutations/use-manage-collaborations";
import { toast } from "@/hooks/use-toast";

const ManageCollaboratorsDialog = ({
  project,
}: {
  project: GetProjectDetailsResponseDto;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [acceptedCollaborators, setAcceptedCollaborators] = useState<string[]>(
    []
  );
  const [declinedCollaborators, setDeclinedCollaborators] = useState<string[]>(
    []
  );
  const [removedCollaborators, setRemovedCollaborators] = useState<string[]>(
    []
  );

  const { runMutation } = useManageCollaborationRequests({
    onSuccessCallback: (message) => {
      toast({
        title: "Success",
        description: message,
      });
      setDialogOpen(false);
    },
    onErrorCallback: (message) => {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  function handleSave() {
    runMutation({
      projectId: project.id,
      data: {
        requestsAccepted: acceptedCollaborators,
        requestsDeclined: declinedCollaborators,
        collaboratorsRemoved: removedCollaborators,
      },
    });
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        // If the dialog is closed, clear the state
        if (!open) {
          setAcceptedCollaborators([]);
          setDeclinedCollaborators([]);
          setRemovedCollaborators([]);
        }
        setDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className=""
          onClick={() => setDialogOpen(true)}
        >
          <span>Manage</span>
          {/* Notification icon if requests > 0 */}
          {project.collaborationRequests &&
            project.collaborationRequests.length > 0 && (
              <span className="bg-destructive text-destructive-foreground rounded-full h-5 w-5 flex items-center justify-center">
                {project.collaborationRequests.length}
              </span>
            )}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage collaborators</DialogTitle>
          <DialogDescription>
            Add or remove collaborators to this project along with accepting or
            decling collaboration requests.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full flex flex-col items-start justify-start space-y-4 py-4">
          {/* Active */}
          <div className="w-full flex flex-col items-start justify-start space-y-2">
            <Label>Active collaborators</Label>
            <ScrollArea className="w-full">
              <div className="w-full flex flex-col items-start justify-start space-y-1 max-h-44">
                {project.collaborators && project.collaborators.length > 0 ? (
                  <>
                    {project.collaborators.map((collaborator) => (
                      <Card
                        key={collaborator.id}
                        className="w-full shadow-none flex flex-row items-center justify-between px-4 py-2 space-y-2"
                      >
                        <div className="w-full flex flex-row items-center justify-start">
                          {collaborator.avatarUrl ? (
                            <Image
                              src={collaborator.avatarUrl}
                              alt={`${collaborator.name}'s avatar`}
                              height={32}
                              width={32}
                              className="rounded-full shadow-sm"
                            />
                          ) : (
                            <UserCircle size={32} />
                          )}
                          <Link
                            href={`/profile/${collaborator.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant={"link"}
                              className="text-lg font-medium"
                            >
                              {collaborator.name}
                              <ArrowUpRight size={24} />
                            </Button>
                          </Link>
                        </div>
                        <Button
                          variant={"destructive"}
                          className={cn(
                            "bg-red-100 hover:bg-red-200 text-red-400 hover:text-red-600",
                            removedCollaborators.includes(collaborator.id) &&
                              "bg-red-200 text-red-600"
                          )}
                          onClick={() => {
                            if (
                              !removedCollaborators.includes(collaborator.id)
                            ) {
                              setRemovedCollaborators([
                                ...removedCollaborators,
                                collaborator.id,
                              ]);
                            } else {
                              setRemovedCollaborators(
                                removedCollaborators.filter(
                                  (collab) => collab !== collaborator.id
                                )
                              );
                            }
                          }}
                        >
                          {removedCollaborators.includes(collaborator.id) ? (
                            <Ban size={20} />
                          ) : (
                            <X size={20} />
                          )}
                          <span className="hidden lg:inline-block">
                            {removedCollaborators.includes(collaborator.id)
                              ? "Removed"
                              : "Remove"}
                          </span>
                        </Button>
                      </Card>
                    ))}
                  </>
                ) : (
                  <MutedText>
                    This project doesn&apos;t have any collaborators yet.
                  </MutedText>
                )}
              </div>
            </ScrollArea>
          </div>
          {/* Requests*/}
          <div className="w-full flex flex-col items-start justify-start space-y-2">
            <Label>Requests</Label>
            <ScrollArea className="w-full">
              <div className="w-full flex flex-col items-start justify-start space-y-1 max-h-44">
                {project.collaborationRequests.length > 0 ? (
                  <>
                    {project.collaborationRequests.map((request) => (
                      <Card
                        key={request.id}
                        className="w-full shadow-none flex flex-col items-start justify-center px-4 py-4 space-y-2"
                      >
                        <div className="w-full flex flex-row items-center justify-start">
                          {request.sender.avatarUrl ? (
                            <Image
                              src={request.sender.avatarUrl}
                              alt={`${request.sender.name}'s avatar`}
                              height={32}
                              width={32}
                              className="rounded-full shadow-sm"
                            />
                          ) : (
                            <UserCircle size={32} />
                          )}
                          <Link
                            href={`/profile/${request.sender.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button
                              variant={"link"}
                              className="text-lg font-medium"
                            >
                              {request.sender.name}
                              <ArrowUpRight size={24} />
                            </Button>
                          </Link>
                        </div>
                        <div>
                          <MutedText className="py-2">
                            {request.message.length > 0
                              ? request.message
                              : "No message"}
                          </MutedText>
                        </div>
                        <div className="w-full flex flex-row items-center justify-between space-x-4">
                          <Button
                            variant={"secondary"}
                            className={cn(
                              "w-full flex items-center justify-center bg-emerald-200 dark:bg-emerald-900 text-emerald-500 hover:bg-emerald-300 dark:hover:bg-emerald-700 hover:text-emerald-700 dark:hover:text-emerald-300 border border-transparent",
                              acceptedCollaborators.includes(
                                request.sender.id
                              ) &&
                                "bg-emerald-300 dark:bg-emerald-700 text-emerald-700 dark:text-emerald-300 border-emerald-500 dark:border-emerald-300"
                            )}
                            onClick={() => {
                              setAcceptedCollaborators([
                                ...acceptedCollaborators,
                                request.sender.id,
                              ]);
                              setDeclinedCollaborators(
                                declinedCollaborators.filter(
                                  (collab) => collab !== request.sender.id
                                )
                              );
                            }}
                          >
                            <Check size={20} />
                            <span className="hidden lg:inline-block">
                              Accept
                            </span>
                          </Button>
                          <Button
                            variant={"secondary"}
                            className={cn(
                              "w-full flex items-center justify-center bg-red-100 dark:bg-red-900 text-red-500 hover:bg-red-200 dark:hover:bg-red-800 hover:text-red-500 dark:hover:text-red-300 border border-transparent",
                              declinedCollaborators.includes(
                                request.sender.id
                              ) &&
                                "bg-red-200 dark:bg-red-800 text-red-500 dark:text-red-300 border-red-300 dark:border-red-300"
                            )}
                            onClick={() => {
                              setDeclinedCollaborators([
                                ...declinedCollaborators,
                                request.sender.id,
                              ]);
                              setAcceptedCollaborators(
                                acceptedCollaborators.filter(
                                  (collab) => collab !== request.sender.id
                                )
                              );
                            }}
                          >
                            <Ban size={20} />
                            <span className="hidden lg:inline-block">
                              Decline
                            </span>
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </>
                ) : (
                  <MutedText>
                    No collaboration requests for this project.
                  </MutedText>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <Button variant={"default"} className="w-full" onClick={handleSave}>
          Save
        </Button>

        <DialogFooter className="w-full">
          <Button
            variant={"ghost"}
            className="w-full"
            onClick={() => {
              // Clear the state
              setAcceptedCollaborators([]);
              setDeclinedCollaborators([]);
              setRemovedCollaborators([]);
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManageCollaboratorsDialog;
