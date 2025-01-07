"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LinkMappingKeys, LinkTypeMapping } from "@/models/links-mapping";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LinkAttachmentIcon } from "@/components/common/link-attachment-icon";
import { ScrollArea } from "@/components/ui/scroll-area";
import useAddNewProjectLink from "@/hooks/mutations/use-add-new-project-link";
import { toast } from "@/hooks/use-toast";

const FORM_TITLE_MIN_LENGTH = 1;
const FORM_LINK_MIN_LENGTH = 1;
const DEFAULT_LINK_ID = LinkMappingKeys[0];

const formSchema = z.object({
  type: z.string({
    required_error: "Please select a link type.",
  }),
  title: z.string().min(FORM_TITLE_MIN_LENGTH, {
    message: "Title must be not be empty.",
  }),
  link: z.string().min(FORM_LINK_MIN_LENGTH, {
    message: "Link must be not be empty.",
  }),
});

const ProjectEditLinkCreateDialogForm = ({
  projectId,
}: {
  projectId: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { runMutation } = useAddNewProjectLink({
    onSuccessCallback: (message) => {
      toast({
        title: message,
      });
      setTimeout(() => {
        setDialogOpen(false);
      }, 2000);
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
      title: LinkTypeMapping.get(DEFAULT_LINK_ID),
      link: "",
      type: DEFAULT_LINK_ID,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    runMutation({
      projectId,
      linkType: data.type,
      linkTitle: data.title,
      linkUrl: data.link,
    });
  }

  function onTypeChange(value: string) {
    if (value === "custom_link_id") {
      form.setValue("title", "Custom");
    } else {
      form.setValue("title", LinkTypeMapping.get(value) ?? "");
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="rounded-full"
          onClick={() => setDialogOpen(true)}
        >
          <Plus size={16} />
          <span>Add new</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>New link</DialogTitle>
          <DialogDescription>
            Add a new external link to your project.
          </DialogDescription>
        </DialogHeader>

        {/* Content */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="w-full flex flex-row items-center justify-center space-x-1">
              {/* Type */}
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="w-fit px-0">
                    <FormLabel className="w-fit">Type</FormLabel>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-fit -mr-4">
                          {
                            <LinkAttachmentIcon
                              id={field.value}
                              size={16}
                              className=""
                            />
                          }
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={(e) => {
                            onTypeChange(e);
                            field.onChange(e);
                          }}
                          className="w-full"
                        >
                          <ScrollArea className="w-full">
                            <div className="w-full flex flex-col items-start justify-start max-h-48">
                              {[...LinkTypeMapping.entries()].map(
                                ([key, value]) => (
                                  <DropdownMenuRadioItem
                                    key={key}
                                    value={key}
                                    className="w-full flex gap-1"
                                  >
                                    <LinkAttachmentIcon
                                      id={key}
                                      size={16}
                                      className=""
                                    />
                                    <span>{value}</span>
                                  </DropdownMenuRadioItem>
                                )
                              )}
                            </div>
                          </ScrollArea>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="w-full">Title</FormLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="Link name"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* URL */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="w-full">Full URL</FormLabel>
                  <FormControl className="w-full">
                    <Input
                      placeholder="https://www.example.com"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormDescription className="flex flex-col pt-4 pb-6 space-y-2">
              <span>Full URL of the linked resource.</span>
            </FormDescription>

            <Button type="submit" variant={"default"} className="">
              Add
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectEditLinkCreateDialogForm;
