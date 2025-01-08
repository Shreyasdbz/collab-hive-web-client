"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import useDeleteProject from "@/hooks/mutations/use-delete-project";
import { useRouter } from "next/navigation";

const DeleteProjectDialog = ({ projectId }: { projectId: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();

  const { runMutation } = useDeleteProject({
    onSuccessCallback: (message) => {
      toast({
        title: message,
      });
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    },
    onErrorCallback: (error) => {
      toast({
        title: error,
        variant: "destructive",
      });
    },
  });

  function handleLeave() {
    runMutation({
      projectId,
    });
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive" onClick={() => setDialogOpen(true)}>
          Delete Project
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLeave}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProjectDialog;
