import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ProjectRolesMapping,
  ProjectComplexitiesMapping,
  ProjectTechnologiesMapping,
} from "@/models/project-mappings";
import {
  GetProjectDetailsResponseDtoPerson,
  GetProjectSearchResultsResponseDto,
} from "@/models/project-dtos";
import Link from "next/link";
import { UserCircle, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { MutedText } from "@/components/ui/typography/muted-text";

const SearchResultsCard = (project: GetProjectSearchResultsResponseDto) => {
  const CollaboratorAvatar = ({
    person,
  }: {
    person: GetProjectDetailsResponseDtoPerson;
  }) => {
    return (
      <div className="flex items-center justify-center h-6 w-6 bg-secondary text-secondary-foreground/30 rounded-full">
        {person.avatarUrl ? (
          <Image
            src={person.avatarUrl}
            height={20}
            width={20}
            alt={`${person.name}'s avatar`}
            className="rounded-full shadow-sm"
          />
        ) : (
          <UserCircle size={16} />
        )}
      </div>
    );
  };

  return (
    <Link
      href={`/projects/${project.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full hover:cursor-pointer"
    >
      <Card className="w-full bg-transparent hover:bg-accent cursor-pointer shadow-none overflow-hidden hover:cursor-pointer transition-colors duration-200 ease-in-out rounded-lg">
        <CardHeader className="px-4 border-b">
          <CardTitle className="font-medium flex gap-2 items-start lg:items-center w-full justify-center lg:justify-start lg:flex-row flex-col-reverse">
            <Badge variant={"favorites"}>
              <Heart size={16} />
              {project.favoriteCount}
            </Badge>
            {project.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3 px-4 pt-4">
          <CardDescription className="flex flex-row gap-1 pt-2 w-full items-center justify-start">
            <span className="font-medium text-foreground">By:</span>
            <Badge
              variant={"projectCreator"}
              className="font-normal text-sm rounded-full"
            >
              {project.creator.avatarUrl && (
                <Image
                  src={project.creator.avatarUrl}
                  height={14}
                  width={14}
                  alt={`${project.creator.name}'s avatar`}
                  className="rounded-full shadow-sm"
                />
              )}
              <span className="ml-1">{project.creator.name}</span>
            </Badge>

            {project.collaborators.length > 0 && <span>+</span>}

            <div className="flex -space-x-3">
              {project.collaborators.map((collaborator) => (
                <CollaboratorAvatar
                  key={collaborator.id}
                  person={{
                    id: collaborator.id,
                    name: "",
                    avatarUrl: collaborator.avatarUrl,
                  }}
                />
              ))}
            </div>
          </CardDescription>
          {/* Project complexity section */}
          <div className="flex gap-2 lg:gap-4 flex-row text-sm lg:text-base py-1">
            <span className="font-medium">Complexity:</span>
            {ProjectComplexitiesMapping.get(project.complexity)}
          </div>
          {/* Open to roles section */}
          <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row">
            <span className="font-medium text-sm lg:text-base whitespace-nowrap">
              Open roles:
            </span>
            <div className="flex flex-wrap gap-0.5">
              {project.roles && project.roles.length === 0 && (
                <MutedText className="lg:pt-1">No roles listed yet</MutedText>
              )}
              {project.roles.map((role) => (
                <Badge
                  key={role}
                  variant={"outlineStrong"}
                  className="font-normal text-sm rounded-full"
                >
                  {ProjectRolesMapping.get(role)}
                </Badge>
              ))}
            </div>
          </div>
          {/* Technologies section */}
          <div className="flex flex-col gap-2 lg:gap-4 lg:flex-row">
            <span className="font-medium text-sm lg:text-base">
              Technologies:
            </span>
            <div className="flex flex-wrap gap-0.5">
              {project.technologies && project.technologies.length === 0 && (
                <MutedText className="lg:pt-1">
                  No technologies listed yet
                </MutedText>
              )}
              {project.technologies.map((technology) => (
                <Badge
                  key={technology}
                  variant={"outlineStrong"}
                  className="font-normal text-sm rounded-full"
                >
                  {ProjectTechnologiesMapping.get(technology)}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SearchResultsCard;
