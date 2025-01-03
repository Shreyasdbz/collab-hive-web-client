"use client";

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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useCreateNewCollaborationRequest from "@/hooks/mutations/use-create-new-collaboration-request";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  requestMessage: z
    .string()
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(120, {
      message: "Message must be at most 120 characters.",
    }),
});

const NewCollaborationJoinRequestDialogForm = ({
  projectId,
}: {
  projectId: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [disableSend, setDisableSend] = useState(false);

  const { runMutation } = useCreateNewCollaborationRequest({
    onSuccessCallback: (message) => {
      toast({
        title: message,
      });
      setDisableSend(true);
      setDialogOpen(false);
    },
    onErrorCallback: (error) => {
      toast({
        title: error,
        variant: "destructive",
      });
      setDisableSend(false);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requestMessage: "Hi, I'd like to join the project!",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    runMutation({
      projectId: projectId,
      requestMessage: values.requestMessage,
    });
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        // If the dialog is closed, clear the state
        if (!open) {
          form.reset();
          setDisableSend(false);
        }
        setDialogOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className=""
          onClick={() => {
            setDialogOpen(true);
          }}
        >
          Request to join
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request to join</DialogTitle>
          <DialogDescription>
            Request to join this project and start collaborating with others.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 lg:space-y-6"
          >
            {/* Name */}
            <FormField
              control={form.control}
              name="requestMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Add a message"
                      {...field}
                      onChange={(e) => {
                        e.preventDefault();
                        setDisableSend(false);
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    <span className="font-medium">
                      ({field.value ? field.value.length : "0"}/120){" "}
                    </span>
                    Inclue a message to let the creator know what you&apos;re
                    interested in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={disableSend}
              aria-disabled={disableSend}
            >
              Send request
            </Button>
          </form>
        </Form>

        <DialogFooter className="w-full">
          <Button
            variant={"ghost"}
            className="w-full"
            onClick={() => {
              form.reset();
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

export default NewCollaborationJoinRequestDialogForm;
