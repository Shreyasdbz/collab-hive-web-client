import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
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
import useCreateNewProject from "@/hooks/mutations/use-create-new-project";
import { cn } from "@/lib/utils";

const FORM_NAME_MIN_LENGTH = 3;
const FORM_NAME_MAX_LENGTH = 60;

const formSchema = z.object({
  projectName: z
    .string()
    .min(FORM_NAME_MIN_LENGTH, {
      message: "Project name must be at least 4 characters.",
    })
    .max(FORM_NAME_MAX_LENGTH, {
      message: "Project name must be at most 60 characters.",
    }),
});

const CreateProjectDialogForm = ({
  setCreatedProjectLink,
  setIsPending,
  setErrorMessage,
}: {
  setCreatedProjectLink: Dispatch<SetStateAction<string | null>>;
  setIsPending: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
}) => {
  const [nameSubmitted, setNameSubmitted] = useState<string | null>(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const { mutation, runMutation } = useCreateNewProject({
    onSuccessCallback: (link) => {
      setIsPending(false);
      setErrorMessage(null);
      setCreatedProjectLink(link);
      setSubmitDisabled(true);
    },
    onErrorCallback: (message) => {
      setIsPending(false);
      setErrorMessage(message);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectName: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsPending(true);
    setCreatedProjectLink(null);
    setErrorMessage(null);
    setNameSubmitted(values.projectName);
    runMutation({
      name: values.projectName,
    });
  }

  useEffect(() => {
    if (mutation.isPending) {
      setIsPending(true);
    } else {
      setIsPending(false);
    }
  }, [mutation.isPending, setIsPending]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 lg:space-y-6"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="projectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Next.js todos"
                  {...field}
                  onChange={(e) => {
                    if (e.target.value === nameSubmitted) {
                      setSubmitDisabled(true);
                    } else {
                      setSubmitDisabled(false);
                    }
                    field.onChange(e);
                  }}
                />
              </FormControl>
              <FormDescription>
                <span
                  className={cn(
                    "font-medium",
                    field.value &&
                      field.value.length < FORM_NAME_MIN_LENGTH &&
                      "text-red-400 dark:text-red-600",
                    field.value &&
                      field.value.length > FORM_NAME_MAX_LENGTH &&
                      "text-red-400 dark:text-red-600"
                  )}
                >
                  ({field.value ? field.value && field.value.length : "0"}/
                  {FORM_NAME_MAX_LENGTH})
                </span>{" "}
                This is your public display name for the project.
              </FormDescription>{" "}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={submitDisabled} className="w-full">
          Get started
        </Button>
      </form>
    </Form>
  );
};

export default CreateProjectDialogForm;
