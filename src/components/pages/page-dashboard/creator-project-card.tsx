import { CircleCheck, CircleMinus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import {
  GetCreatorProjectCardResponseDto,
  GetProjectCardResponseDtoCollaborator,
} from "@/models/collaboration-dtos";
import { ProjectTechnologiesMapping } from "@/models/project-mappings";

const CreatorProjectCard = ({
  project,
}: {
  project: GetCreatorProjectCardResponseDto;
}) => {
  /**
   * Gets the text for the technologies row of the card
   * @param technologies: string[] - Ids of the technologies
   * @returns
   * - If no technologies, returns "No technologies added yet"
   * - If 1 technology, returns the technology name
   * - If 2 technologies, returns "<technology 1 name> and <technology 2 name>"
   * - If more than 2 technologies, returns "<technology 1 name>, <technology 2 name> and <number of other technologies> others"
   */
  function getTechnologiesText(technologies: string[]) {
    if (technologies.length === 0) {
      return "No technologies added yet";
    }
    if (technologies.length === 1) {
      return ProjectTechnologiesMapping.get(technologies[0]);
    }
    if (technologies.length === 2) {
      return `${ProjectTechnologiesMapping.get(
        technologies[0]
      )} and ${ProjectTechnologiesMapping.get(technologies[1])}`;
    }
    return `${ProjectTechnologiesMapping.get(
      technologies[0]
    )}, ${ProjectTechnologiesMapping.get(technologies[1])} and ${
      technologies.length - 2
    } others`;
  }

  /**
   * Gets the text for the collaborators row of the card
   * @param collaborators: GetProjectCardResponseDtoCollaborator[]
   * @returns
   * - If no collaborators, returns "No collaborators"
   * - If 1 collaborator, returns "You and <collaborator name>"
   * - If 2 collaborators, returns "You, <collaborator 1 name> and <collaborator 2 name>"
   * - If more than 2 collaborators, returns "You, <collaborator 1 name> and <number of other collaborators> others"
   */
  function getCollaboratorsText(
    collaborators: GetProjectCardResponseDtoCollaborator[]
  ) {
    if (collaborators.length === 0) {
      return "No collaborators";
    }

    if (collaborators.length === 1) {
      return `You and ${collaborators[0].name}`;
    }

    if (collaborators.length === 2) {
      return `You, ${collaborators[0].name} and ${collaborators[1].name}`;
    }

    return `You, ${collaborators[0].name} and ${
      collaborators.length - 1
    } others`;
  }

  return (
    <Link
      href={`/projects/${project.id}`}
      className="w-full min-w-fit lg:w-fit"
    >
      <Card className="bg-accent/30 shadow-sm lg:pr-20 w-full lg:w-fit min-w-fit hover:bg-accent/75">
        <CardHeader>
          <CardTitle className="lg:whitespace-nowrap">{project.name}</CardTitle>
          <CardDescription>
            <Badge
              className="gap-1"
              variant={
                project.isOpen === true
                  ? "collaborationActive"
                  : "collaborationInactive"
              }
            >
              {project.isOpen === true ? (
                <CircleCheck size={14} />
              ) : (
                <CircleMinus size={14} />
              )}
              {project.isOpen === true ? "Open" : "Closed"}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="lg:min-h-14 justify-start items-center flex flex-row">
          <p className="lg:whitespace-nowrap text-lg font-light">
            {getTechnologiesText(project.technologies)}
          </p>
        </CardContent>
        <CardFooter className="lg:min-h-12 justify-start items-center flex flex-row">
          <span className="text-secondary-foreground/75">
            {getCollaboratorsText(project.collaborators)}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CreatorProjectCard;
