"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { GetProfileDetailsResponseDto } from "@/models/profile-dtos";
import useUpdateProfileDetails from "@/hooks/mutations/use-update-profile-details";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const FORM_NAME_MIN_LENGTH = 2;
const FORM_NAME_MAX_LENGTH = 160;
const FORM_BIO_MAX_LENGTH = 500;

const formSchema = z.object({
  name: z
    .string()
    .min(FORM_NAME_MIN_LENGTH, {
      message: "Name must be at least 2 characters.",
    })
    .max(FORM_NAME_MAX_LENGTH, {
      message: "Name must be at most 100 characters.",
    }),
  bio: z.string().max(FORM_BIO_MAX_LENGTH, {
    message: "Bio must be at most 500 characters.",
  }),
});

const ProfileEditDetailsForm = ({
  initialDetails,
}: {
  initialDetails: GetProfileDetailsResponseDto;
}) => {
  const { runMutation } = useUpdateProfileDetails({
    onSuccessCallback: (message) => {
      toast({
        title: message,
      });
    },
    onErrorCallback: (message) => {
      toast({
        title: message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialDetails.name,
      bio: initialDetails.bio,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    runMutation({
      data: {
        name: values.name,
        bio: values.bio,
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="">
                <div className="flex flex-flex-row items-center justify-between space-x-2">
                  <span>Name</span>
                  <Button
                    variant={"link"}
                    onClick={(e) => {
                      // ignore default
                      e.preventDefault();
                      // reset the field
                      form.setValue("name", initialDetails.name);
                    }}
                    className="font-normal"
                  >
                    Reset
                  </Button>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your name"
                  className="w-full"
                  {...field}
                  value={field.value || ""}
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
                chars
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex flex-flex-row items-center justify-between space-x-2">
                  <span>Bio</span>
                  <Button
                    variant={"link"}
                    onClick={(e) => {
                      // ignore default
                      e.preventDefault();
                      // reset the field
                      form.setValue("bio", initialDetails.bio);
                    }}
                    className="font-normal"
                  >
                    Reset
                  </Button>
                </div>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a short description about yourself"
                  className="resize-none min-h-44"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormDescription>
                <span
                  className={cn(
                    "font-medium",
                    field.value &&
                      field.value.length > FORM_BIO_MAX_LENGTH &&
                      "text-red-400 dark:text-red-600"
                  )}
                >
                  ({field.value ? field.value && field.value.length : "0"}/
                  {FORM_BIO_MAX_LENGTH})
                </span>{" "}
                Add some details about yorself like your experience, skills, and
                interests.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Save button */}
        <div className="w-full">
          <Button className="w-full lg:w-fit" type="submit" variant={"default"}>
            <Save size={18} />
            <span>Save changes</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileEditDetailsForm;
