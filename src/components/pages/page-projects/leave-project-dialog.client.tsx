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
import useLeaveProject from "@/hooks/mutations/use-leave-project";

const LeaveProjectDialog = ({ projectId }: { projectId: string }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { runMutation } = useLeaveProject({
    onSuccessCallback: (message) => {
      toast({
        title: message,
      });
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
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          Leave Project
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Project</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to leave this project?
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleLeave}>
            Leave
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveProjectDialog;
