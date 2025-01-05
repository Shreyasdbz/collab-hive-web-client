"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import useUpdateProjectDetails from "@/hooks/mutations/use-update-project-details";
import { toast } from "@/hooks/use-toast";
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
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleMinus, Plus, Save, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ProjectComplexitiesMapping,
  ProjectRolesMapping,
  ProjectTechnologiesMapping,
} from "@/models/project-mappings";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GetProjectDetailsResponseDto } from "@/models/project-dtos";

const FORM_NAME_MIN_LENGTH = 3;
const FORM_NAME_MAX_LENGTH = 60;
const FORM_DESCRIPTION_MAX_LENGTH = 1200;

const formSchema = z.object({
  name: z
    .string()
    .min(FORM_NAME_MIN_LENGTH, {
      message: "Name must be at least 3 characters.",
    })
    .max(FORM_NAME_MAX_LENGTH, {
      message: "Name must be at most 60 characters.",
    }),
  description: z.string().max(FORM_DESCRIPTION_MAX_LENGTH, {
    message: "Description must be at most 1000 characters.",
  }),
  complexity: z.string().min(10, {
    message: "Please pick a project complexity level",
  }),
  // Technologies - array of Ids (strings) - can be empty
  technologies: z.array(z.string()),
  // Roles open - array of Ids (strings) - can be empty
  roles: z.array(z.string()),
  // Collaboration status: boolean
  isOpen: z.boolean(),
});

const ProjectEditDetailsForm = ({
  initialData,
}: {
  initialData: GetProjectDetailsResponseDto;
}) => {
  const { runMutation } = useUpdateProjectDetails({
    onSuccessCallback: () => {
      toast({
        title: "Project updated successfully",
      });
    },
    onErrorCallback: (message) => {
      toast({
        title: "Could not update project",
        description: message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
      description: initialData.description,
      complexity: initialData.complexity,
      technologies: initialData.technologies,
      roles: initialData.roles,
      isOpen: initialData.isOpen,
    },
  });

  function handleChangeCollaborationStatusClick(newStatus: "open" | "closed") {
    if (newStatus === "open") {
      form.setValue("isOpen", true);
    } else {
      form.setValue("isOpen", false);
    }
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Compare initialData with values for each field
    const hasChanges = Object.keys(values).some(
      (key) =>
        values[key as keyof typeof values] !==
        initialData[key as keyof typeof initialData]
    );

    if (!hasChanges) {
      toast({
        title: "No changes detected",
        description: "Please make some changes before submitting.",
      });
    } else {
      runMutation({
        projectId: initialData.id,
        updateData: {
          name: values.name,
          description: values.description,
          complexity: values.complexity,
          isOpen: values.isOpen,
          roles: values.roles,
          technologies: values.technologies,
        },
      });
    }
  }

  const SelectionPill = ({
    value,
    selectionType,
  }: {
    value: string;
    selectionType: "technologies" | "roles";
  }) => {
    function getVariant(): "formSelected" | "formInactive" {
      if (selectionType === "technologies") {
        if (form.getValues("technologies").includes(value)) {
          return "formSelected";
        } else {
          return "formInactive";
        }
      }
      if (selectionType === "roles") {
        if (form.getValues("roles").includes(value)) {
          return "formSelected";
        } else {
          return "formInactive";
        }
      }
      return "formInactive";
    }

    function performOnClick() {
      if (selectionType === "technologies") {
        if (form.getValues("technologies").includes(value)) {
          form.setValue(
            "technologies",
            form.getValues("technologies").filter((val) => val !== value)
          );
        } else {
          form.setValue("technologies", [
            ...form.getValues("technologies"),
            value,
          ]);
        }
      } else if (selectionType === "roles") {
        if (form.getValues("roles").includes(value)) {
          form.setValue(
            "roles",
            form.getValues("roles").filter((val) => val !== value)
          );
        } else {
          form.setValue("roles", [...form.getValues("roles"), value]);
        }
      }
    }

    return (
      <Button variant={getVariant()} onClick={performOnClick}>
        {selectionType === "technologies" && (
          <>
            <span>{ProjectTechnologiesMapping.get(value)}</span>
            {form.getValues("technologies").includes(value) ? (
              <X className="w-2 h-2 ml-1" />
            ) : (
              <Plus className="w-2 h-2 ml-1" />
            )}
          </>
        )}
        {selectionType === "roles" && (
          <>
            <span>{ProjectRolesMapping.get(value)}</span>
            {form.getValues("roles").includes(value) ? (
              <X className="w-2 h-2 ml-1" />
            ) : (
              <Plus className="w-2 h-2 ml-1" />
            )}
          </>
        )}
      </Button>
    );
  };

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
                      form.setValue("name", initialData.name);
                    }}
                    className="font-normal"
                  >
                    Reset
                  </Button>
                </div>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter a name for the project"
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
                This is your public display name for the project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex flex-flex-row items-center justify-between space-x-2">
                  <span>Description</span>
                  <Button
                    variant={"link"}
                    onClick={(e) => {
                      // ignore default
                      e.preventDefault();
                      // reset the field
                      form.setValue("description", initialData.description);
                    }}
                    className="font-normal"
                  >
                    Reset
                  </Button>
                </div>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add a description about your project"
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
                      field.value.length > FORM_DESCRIPTION_MAX_LENGTH &&
                      "text-red-400 dark:text-red-600"
                  )}
                >
                  ({field.value ? field.value && field.value.length : "0"}/
                  {FORM_DESCRIPTION_MAX_LENGTH})
                </span>{" "}
                Add some details about your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Complexity */}
        <FormField
          control={form.control}
          name="complexity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex flex-flex-row items-center justify-between space-x-2">
                  <span>Complexity</span>
                  <Button
                    variant={"link"}
                    onClick={(e) => {
                      // ignore default
                      e.preventDefault();
                      // reset the field
                      form.setValue("complexity", initialData.complexity);
                    }}
                    className="font-normal"
                  >
                    Reset
                  </Button>
                </div>
              </FormLabel>
              <FormControl className="w-full">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1 lg:flex-row lg:space-x-4 lg:space-y-0 py-1"
                >
                  {[...ProjectComplexitiesMapping].map(([key, value]) => (
                    <FormItem
                      key={key}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={key} />
                      </FormControl>
                      <FormLabel className="font-normal">{value}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Choose what you estimate the scale of your project will be.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Technologies */}
        <FormField
          control={form.control}
          name="technologies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex flex-flex-row items-center justify-between space-x-2">
                  <span>Technologies</span>
                  <Button
                    variant={"link"}
                    onClick={(e) => {
                      // ignore default
                      e.preventDefault();
                      // reset the field
                      form.setValue("technologies", initialData.technologies);
                    }}
                    className="font-normal"
                  >
                    Reset
                  </Button>
                </div>
              </FormLabel>
              <FormControl>
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-full flex flex-col items-start justify-center space-y-2">
                    <Label className="font-normal">
                      Selected technologies:
                    </Label>
                    {field.value && field.value.length === 0 && (
                      <span className="text-gray-400">
                        No technologies selected
                      </span>
                    )}
                    <div className="w-full flex flex-wrap items-center justify-start gap-1  px-2 py-2">
                      {field.value &&
                        field.value.map((technology) => (
                          <SelectionPill
                            key={technology}
                            value={technology}
                            selectionType="technologies"
                          />
                        ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-start justify-center space-y-2">
                    <Label className="font-normal">
                      Available technologies:
                    </Label>
                    <ScrollArea className="w-full border border-secondary rounded-lg">
                      <div className="w-full flex flex-wrap items-center justify-start gap-1 px-2 py-2 max-h-56">
                        {[...ProjectTechnologiesMapping.entries()].map(
                          ([key]) => {
                            if (field.value && field.value.includes(key)) {
                              return null;
                            } else {
                              return (
                                <SelectionPill
                                  key={key}
                                  value={key}
                                  selectionType="technologies"
                                />
                              );
                            }
                          }
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Select the technologies you will be using in your project.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Roles */}
        <FormField
          control={form.control}
          name="roles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex flex-flex-row items-center justify-between space-x-2">
                  <span>Roles</span>
                  <Button
                    variant={"link"}
                    onClick={(e) => {
                      // ignore default
                      e.preventDefault();
                      // reset the field
                      form.setValue("roles", initialData.roles);
                    }}
                    className="font-normal"
                  >
                    Reset
                  </Button>
                </div>
              </FormLabel>
              <FormControl>
                <div className="w-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-full flex flex-col items-start justify-center space-y-2">
                    <Label className="font-normal">Selected roles:</Label>
                    {field.value && field.value.length === 0 && (
                      <span className="text-gray-400">No roles selected</span>
                    )}
                    <div className="w-full flex flex-wrap items-center justify-start gap-1  px-2 py-2">
                      {field.value &&
                        field.value.map((role) => (
                          <SelectionPill
                            key={role}
                            value={role}
                            selectionType="roles"
                          />
                        ))}
                    </div>
                  </div>
                  <div className="w-full flex flex-col items-start justify-center space-y-2">
                    <Label className="font-normal">Available roles:</Label>
                    <ScrollArea className="w-full border border-secondary rounded-lg">
                      <div className="w-full flex flex-wrap items-center justify-start gap-1 px-2 py-2 max-h-56">
                        {[...ProjectRolesMapping.entries()].map(([key]) => {
                          if (field.value && field.value.includes(key)) {
                            return null;
                          } else {
                            return (
                              <SelectionPill
                                key={key}
                                value={key}
                                selectionType="roles"
                              />
                            );
                          }
                        })}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </FormControl>
              <FormDescription>
                Select the collaborator roles your are seeking.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Collaboration status */}
        <FormField
          control={form.control}
          name="isOpen"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                <div className="flex flex-flex-row items-center justify-between space-x-2">
                  <span>Collaboration status</span>
                  <Button
                    variant={"link"}
                    onClick={(e) => {
                      // ignore default
                      e.preventDefault();
                      // reset the field
                      form.setValue("isOpen", initialData.isOpen);
                    }}
                    className="font-normal"
                  >
                    Reset
                  </Button>
                </div>
              </FormLabel>
              <FormControl className="w-full">
                <Tabs
                  value={
                    field.value && field.value === true ? "open" : "closed"
                  }
                  className="w-full px-4 lg:px-0"
                >
                  <TabsList className="w-full">
                    <TabsTrigger
                      className={cn(
                        "flex flex-row items-center justify-center w-full gap-1",
                        field.value === false
                          ? "bg-neutral-200 dark:text-neutral-800"
                          : "bg-accent text-accent-foreground"
                      )}
                      value="closed"
                      onClick={() => {
                        handleChangeCollaborationStatusClick("closed");
                      }}
                    >
                      <CircleMinus
                        size={14}
                        className="text-neutral-800 dark:text-neutral-200"
                      />
                      <span className="text-neutral-800 dark:text-neutral-200">
                        Closed
                      </span>
                    </TabsTrigger>
                    <TabsTrigger
                      className={cn(
                        "flex flex-row items-center justify-center w-full gap-1",
                        field.value === true
                          ? "bg-emerald-200 dark:text-emerald-800"
                          : "bg-accent text-accent-foreground"
                      )}
                      value="open"
                      onClick={() => {
                        handleChangeCollaborationStatusClick("open");
                      }}
                    >
                      <CircleCheck
                        size={14}
                        className="text-emerald-800 dark:text-emerald-200"
                      />
                      <span className="text-emerald-800 dark:text-emerald-200">
                        Open
                      </span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </FormControl>
              <FormDescription>
                Open up your project to collaboration requests.
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

export default ProjectEditDetailsForm;
