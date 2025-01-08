import { User } from "lucide-react";
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
  GetCollaboratorProjectCardResponseDto,
  GetProjectCardResponseDtoCollaborator,
} from "@/models/collaboration-dtos";
import { ProjectTechnologiesMapping } from "@/models/project-mappings";
import Image from "next/image";
import { MutedText } from "@/components/ui/typography/muted-text";

const CollaboratorProjectCard = ({
  project,
}: {
  project: GetCollaboratorProjectCardResponseDto;
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
   * - If 1 collaborator, returns "<creator name> and you"
   * - If 2 collaborators, returns "<creator name>, you, and <collaborator 1 name>"
   * - If more than 2 collaborators, returns "<creator name>, you, <collaborator 1 name> and <number of other collaborators> others"
   */
  function getCollaboratorsText(
    collaborators: GetProjectCardResponseDtoCollaborator[]
  ) {
    if (collaborators.length === 0) {
      return `with just ${project.creatorName} and you`;
    }
    if (collaborators.length === 1) {
      return `with ${project.creatorName}, you, and ${collaborators[0].name}`;
    }
    return `with ${project.creatorName}, you, ${collaborators[0].name} and ${
      collaborators.length - 2
    } other(s)`;
  }

  return (
    <Link
      href={`/projects/${project.id}`}
      className="w-full min-w-fit lg:w-fit"
    >
      <Card className="lg:pr-20 w-full lg:w-fit min-w-fit bg-transparent hover:bg-accent shadow-none transition-colors duration-300">
        <CardHeader>
          <CardTitle className="lg:whitespace-nowrap text-lg font-medium tracking-normal">
            {project.name}
          </CardTitle>
          <CardDescription>
            <Badge className="gap-1" variant={"projectCreator"}>
              {project.creatorAvatarUrl ? (
                <Image
                  src={project.creatorAvatarUrl}
                  alt={`${project.creatorName}'s avatar`}
                  width={14}
                  height={14}
                  className="rounded-full"
                />
              ) : (
                <User size={14} />
              )}
              <span>{project.creatorName}</span>
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="lg:whitespace-nowrap ext-lg font-normal">
            {getTechnologiesText(project.technologies)}
          </p>
        </CardContent>
        <CardFooter>
          <MutedText className="text-secondary-foreground/75">
            {getCollaboratorsText(project.collaborators)}
          </MutedText>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CollaboratorProjectCard;
