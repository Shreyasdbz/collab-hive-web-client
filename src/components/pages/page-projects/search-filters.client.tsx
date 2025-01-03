"use client";

import {
  ProjectSearchSortByMapping,
  ProjectComplexitiesMapping,
  ProjectRolesMapping,
  ProjectTechnologiesMappingSortedAlphabetically,
} from "@/models/project-mappings";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useProjectsSearch from "@/providers/projects-search-provider";

const SearchFilters = () => {
  const {
    sortBySelected,
    updateSortBySelection,
    rolesSelected,
    updateRolesSelection,
    complexitiesSelected,
    updateComplexitiesSelection,
    technologiesSelected,
    updateTechnologiesSelection,
    resetFilters,
  } = useProjectsSearch();

  const SortBySection = () => {
    return (
      <AccordionItem value="sort-by">
        <AccordionTrigger>Sort by</AccordionTrigger>
        <AccordionContent className="space-y-2">
          <RadioGroup value={sortBySelected}>
            {[...ProjectSearchSortByMapping.entries()].map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={key}
                  id={key}
                  onClick={() => updateSortBySelection?.(key)}
                />
                <Label htmlFor={key}>{value}</Label>
              </div>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    );
  };

  const RolesSelection = () => {
    return (
      <AccordionItem value="project-role">
        <AccordionTrigger>Role</AccordionTrigger>
        <AccordionContent className="space-y-2">
          {[...ProjectRolesMapping.entries()].map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={rolesSelected.includes(key)}
                onClick={() => {
                  updateRolesSelection?.(key);
                }}
              />
              <Label
                htmlFor={key}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {value}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  };

  const ProjectComplexitySection = () => {
    return (
      <AccordionItem value="project-complexity">
        <AccordionTrigger>Project complexity</AccordionTrigger>
        <AccordionContent className="space-y-2">
          {[...ProjectComplexitiesMapping.entries()].map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox
                id={key}
                checked={complexitiesSelected.includes(key)}
                onClick={() => {
                  updateComplexitiesSelection?.(key);
                }}
              />
              <Label
                htmlFor={key}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {value}
              </Label>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  };

  const ProjectTechnologySection = () => {
    return (
      <AccordionItem value="project-technology">
        <AccordionTrigger>Technologies</AccordionTrigger>
        <AccordionContent className="space-y-2">
          {[...ProjectTechnologiesMappingSortedAlphabetically.entries()].map(
            ([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={technologiesSelected.includes(key)}
                  onClick={() => {
                    updateTechnologiesSelection?.(key);
                  }}
                />
                <Label
                  htmlFor={key}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {value}
                </Label>
              </div>
            )
          )}
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <Card className="w-full lg:max-w-sm lg:w-fit h-full shadow-none rounded-lg">
      <CardHeader>
        <CardTitle className="lg:whitespace-nowrap">Browse projects</CardTitle>
        <CardDescription>
          Search for projects by selecting any of the filters.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Accordion type="single" collapsible>
          <SortBySection />
          <RolesSelection />
          <ProjectComplexitySection />
          <ProjectTechnologySection />
        </Accordion>
      </CardContent>

      <CardFooter className="flex flex-col space-y-2">
        <Button variant={"outline"} className="w-full" onClick={resetFilters}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SearchFilters;
