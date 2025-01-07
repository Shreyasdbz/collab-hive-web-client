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
import useDeleteProjectLink from "@/hooks/mutations/use-delete-project-link";
import useDeleteProfileLink from "@/hooks/mutations/use-delete-profile-link";
import { useRouter } from "next/navigation";
import { LinkAttachmentIcon } from "./link-attachment-icon";
import { Separator } from "../ui/separator";
import { Trash } from "lucide-react";

const DeleteLinkDialog = ({
  projectId,
  linkId,
  linkType,
  linkTitle,
  linkUrl,
  domain,
  redirectUrl,
}: {
  projectId: string;
  linkId: string;
  linkType: string;
  linkTitle: string;
  linkUrl: string;
  domain: "profile" | "project";
  redirectUrl: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const router = useRouter();

  const { runMutation: projectMutation } = useDeleteProjectLink({
    onSuccessCallback: (message) => {
      toast({
        title: message,
      });
      router.push(redirectUrl);
    },
    onErrorCallback: (error) => {
      toast({
        title: error,
        variant: "destructive",
      });
    },
  });
  const { runMutation: profileMutation } = useDeleteProfileLink({
    onSuccessCallback: (message) => {
      toast({
        title: message,
      });
      router.push(redirectUrl);
    },
    onErrorCallback: (error) => {
      toast({
        title: error,
        variant: "destructive",
      });
    },
  });

  function handleSubmit() {
    if (domain === "profile") {
      profileMutation({
        linkId,
      });
    } else {
      projectMutation({
        projectId,
        linkId,
      });
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => setDialogOpen(true)}
        >
          <LinkAttachmentIcon id={linkType} size={16} className="mr-1" />
          <span>{linkTitle}</span>
          <Separator orientation="vertical" />
          <Trash size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete link</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-2">
          <span>
            Are you sure you want to delete this link from your {domain}?
          </span>
          <span>{linkUrl}</span>
        </DialogDescription>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLinkDialog;
