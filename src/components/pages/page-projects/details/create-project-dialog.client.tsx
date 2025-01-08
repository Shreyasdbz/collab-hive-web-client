"use client";

import { useState } from "react";
import { Plus, ArrowUpRight } from "lucide-react";
import useUser from "@/providers/UserProvider";
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
import CreateProjectDialogForm from "./create-project-dialog-form.client";
import Link from "next/link";
import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import { MutedText } from "@/components/ui/typography/muted-text";
import { Card, CardContent } from "@/components/ui/card";

const CreateProjectDialog = ({
  useFullWidthButton,
}: {
  useFullWidthButton: boolean;
}) => {
  const { user } = useUser();
  const [createdProjectLink, setCreatedProjectLink] = useState<string | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  if (!user) {
    return <></>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild className={useFullWidthButton ? "w-full" : ""}>
        <Button
          variant="default"
          className={useFullWidthButton ? "w-full" : ""}
        >
          <Plus size={16} />
          <span>Create new</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New project</DialogTitle>
          <DialogDescription>
            Create a new project and start collaborating with others.
          </DialogDescription>
        </DialogHeader>

        <CreateProjectDialogForm
          setCreatedProjectLink={setCreatedProjectLink}
          setIsPending={setIsPending}
          setErrorMessage={setErrorMessage}
        />

        <DialogFooter className="w-full flex items-center justify-center">
          {isPending === true && (
            <FetchingBlock
              message="Creating a new project ..."
              className="h-20 rounded-lg"
            />
          )}
          {errorMessage && (
            <ErrorBlock message={errorMessage} className="h-20 rounded-lg" />
          )}
          {createdProjectLink !== null && (
            <Card className="w-full py-0">
              <CardContent className="w-full flex items-center flex-row justify-between pt-5">
                <MutedText>Project created successfully.</MutedText>
                <Link
                  href={`/projects/${createdProjectLink}`}
                  className="cursor-pointer"
                >
                  <Button variant={"link"} className="cursor-pointer">
                    <span>Open</span>
                    <ArrowUpRight size={16} />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
