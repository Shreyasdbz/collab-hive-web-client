import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GetProjectDetailsResponseDto } from "@/models/project-dtos";
import { Label } from "@/components/ui/label";
import { CircleCheck, CircleMinus, Heart } from "lucide-react";
import { MutedText } from "@/components/ui/typography/muted-text";
import {
  ProjectComplexitiesMapping,
  ProjectRolesMapping,
  ProjectTechnologiesMapping,
} from "@/models/project-mappings";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import LinkPillView from "@/components/common/link-pill-view";

const ProjectViewDetails = ({
  project,
  user,
  toggleFavoriteCallback,
}: {
  project: GetProjectDetailsResponseDto;
  user: User | null;
  toggleFavoriteCallback: () => void;
}) => {
  const FavoriteSection = () => {
    return (
      <div className="w-full flex items-center justify-start space-x-1">
        <Button
          variant={"ghost"}
          className={cn(
            "rounded-lg text-sm shadow-none text-red-500 hover:bg-red-200 hover:text-red-600 px-4 py-0",
            project.userHasFavorited ? "text-red-600" : ""
          )}
          onClick={
            user ? () => toggleFavoriteCallback() : () => alert("Please log in")
          }
        >
          {project.userHasFavorited ? (
            <Heart size={16} fill="#dc2626" />
          ) : (
            <Heart size={16} />
          )}
          {project.favoriteCount}
        </Button>
        <MutedText>people have favorited this project</MutedText>
      </div>
    );
  };

  const DescriptionSection = () => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Description</Label>
        <p>
          {project.description && project.description.length > 0 ? (
            <>
              {project.description.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </>
          ) : (
            <span>{`This project doesn't have a description yet`}</span>
          )}
        </p>
      </div>
    );
  };

  const ComplexitySection = () => {
    const complexityString = ProjectComplexitiesMapping.get(project.complexity);

    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Complexity</Label>
        <p>
          {`This project is of `}
          <span className="font-medium">{complexityString}</span>
          {` complexity`}
        </p>
      </div>
    );
  };

  const TechnologiesSection = () => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Technologies used</Label>
        <div className="w-full flex flex-wrap gap-1">
          {project.technologies.map((tech, index) => (
            <Badge
              key={index}
              variant={"outlineStrong"}
              className="font-normal rounded-full text-sm"
            >
              {ProjectTechnologiesMapping.get(tech)}
            </Badge>
          ))}
          {project.technologies.length === 0 && (
            <span>
              This project doesn&apos;t have any technologies listed yet.
            </span>
          )}
        </div>
      </div>
    );
  };

  const RolesSection = () => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Roles open</Label>
        <div className="w-full flex flex-wrap gap-1">
          {project.roles.map((role, index) => (
            <Badge
              key={index}
              variant={"outlineStrong"}
              className="font-normal rounded-full text-sm"
            >
              {ProjectRolesMapping.get(role)}
            </Badge>
          ))}
          {project.roles.length === 0 && (
            <span>
              This project isn&apos;t looking for any specific roles right now.
            </span>
          )}
        </div>
      </div>
    );
  };

  const LinksSection = () => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Links</Label>
        <div className="w-full flex flex-wrap gap-1">
          {project.links &&
            project.links.map((link) => (
              <LinkPillView
                key={link.id}
                type={link.linkType}
                title={link.linkTitle}
                url={link.linkUrl}
              />
            ))}
          {project.links && project.links.length === 0 && (
            <span>
              This project doesn&apos;t have any links to external resources.
            </span>
          )}
        </div>
      </div>
    );
  };

  const CollaborationStatusSection = () => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Collaboration status</Label>
        <div>
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
            {project.isOpen === true
              ? "Open to collaboration requests"
              : "Closed to collaboration requests"}
          </Badge>
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>
            General information about the project.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <FavoriteSection />
          <DescriptionSection />
          <ComplexitySection />
          <TechnologiesSection />
          <RolesSection />
          <LinksSection />
          <CollaborationStatusSection />
        </CardContent>

        {project.creator.id === user?.id && (
          <CardFooter className="">
            <Link href={`/projects/${project.id}/edit-details`}>
              <Button variant={"outline"}>Edit details</Button>
            </Link>
          </CardFooter>
        )}
      </Card>
    </>
  );
};

export default ProjectViewDetails;
