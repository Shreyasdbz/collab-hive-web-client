"use client";

import { useEffect } from "react";
import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import useGetProfileDetails from "@/hooks/queries/use-get-profile-details";
import useUser from "@/providers/UserProvider";
import { ArrowUpRight, CircleCheck, CircleMinus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/layout/page-wrapper";
import {
  GetProfileDetailsResponseDto,
  GetProfileDetailsResponseDtoProjectCard,
} from "@/models/profile-dtos";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { MutedText } from "@/components/ui/typography/muted-text";
import { Badge } from "@/components/ui/badge";

const ProfileView = ({
  profileId,
  withWrapper,
}: {
  profileId?: string;
  withWrapper: boolean;
}) => {
  const { user } = useUser();
  const { data, error, isLoading } = useGetProfileDetails({ profileId });

  const BioSection = ({ name, bio }: { name: string; bio: string }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Bio</Label>
        <>
          {bio && bio.length > 0 ? (
            <p>{bio}</p>
          ) : (
            <MutedText>{`${name} doesn't have a bio yet`}</MutedText>
          )}
        </>
      </div>
    );
  };

  const FavoritesSection = ({
    projects,
  }: {
    projects: GetProfileDetailsResponseDtoProjectCard[];
  }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <Label className="font-medium text-sm">Favorites</Label>
        <ScrollArea
          className={cn(
            "w-full",
            projects &&
              projects.length > 2 &&
              "border border-secondary rounded-md px-1 py-1"
          )}
        >
          <div className="w-full flex flex-wrap items-start justify-start gap-1 max-h-56">
            {projects &&
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-fit lg:max-w-fit"
                >
                  <Button
                    variant={"outline"}
                    className="flex flex-col min-h-fit pr-20 items-start justify-center w-full lg:w-fit lg:max-w-fit"
                  >
                    <span className="text-base font-medium lg:whitespace-nowrap">
                      {project.name}
                    </span>
                    <div>
                      <span className="font-normal text-secondary-foreground/75">
                        {project.creatorName}
                      </span>
                    </div>
                  </Button>
                </Link>
              ))}
            {projects && projects.length === 0 && (
              <MutedText>No favorite projects yet</MutedText>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const ProjectsCreatedSection = ({
    projects,
  }: {
    projects: GetProfileDetailsResponseDtoProjectCard[];
  }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <ScrollArea
          className={cn(
            "w-full",
            projects &&
              projects.length > 2 &&
              "border border-secondary rounded-md px-1 py-1"
          )}
        >
          <div className="w-full flex flex-wrap items-start justify-start gap-1 max-h-56">
            {projects &&
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-fit lg:max-w-fit"
                >
                  <Button
                    variant={"outline"}
                    className="flex flex-col min-h-fit pr-20 items-start justify-center w-full lg:w-fit lg:max-w-fit"
                  >
                    <span className="text-lg font-medium">{project.name}</span>
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
                  </Button>
                </Link>
              ))}
            {projects && projects.length === 0 && (
              <MutedText>{`No created projects yet.`}</MutedText>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const ProjectsCollaboratedSection = ({
    projects,
  }: {
    projects: GetProfileDetailsResponseDtoProjectCard[];
  }) => {
    return (
      <div className="w-full flex flex-col items-start justify-start space-y-1">
        <ScrollArea
          className={cn(
            "w-full",
            projects &&
              projects.length > 2 &&
              "border border-secondary rounded-md px-1 py-1"
          )}
        >
          <div className="w-full flex flex-wrap items-start justify-start gap-1 max-h-56">
            {projects &&
              projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full lg:w-fit lg:max-w-fit"
                >
                  <Button
                    variant={"outline"}
                    className="flex flex-col min-h-fit pr-20 items-start justify-center w-full lg:w-fit lg:max-w-fit"
                  >
                    <span className="text-lg font-medium">{project.name}</span>
                    <Badge variant={"projectCreator"} className="gap-1">
                      {project.creatorAvatarUrl && (
                        <Image
                          priority
                          src={project.creatorAvatarUrl}
                          alt={`${project.creatorName}'s avatar`}
                          height={14}
                          width={14}
                          className="rounded-full"
                        />
                      )}
                      <span className="font-light text-base tracking-wide">
                        {project.creatorName}
                      </span>
                    </Badge>
                  </Button>
                </Link>
              ))}
            {projects && projects.length === 0 && (
              <MutedText>{`${data?.name} is not collaborating on any projects yet.`}</MutedText>
            )}
          </div>
        </ScrollArea>
      </div>
    );
  };

  const WithWrapper = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    return <PageWrapper title={title}>{children}</PageWrapper>;
  };

  const Content = ({ profile }: { profile: GetProfileDetailsResponseDto }) => {
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-2">
        {/* Details */}
        <Card className="w-full shadow-none">
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col lg:flex-row items-center justify-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-10">
            {profile.avatarUrl && (
              <Image
                priority
                src={profile.avatarUrl}
                alt={`${profile.name}'s avatar`}
                height={128}
                width={128}
                className="rounded-full ring ring-offset-4 ring-accent"
              />
            )}
            <div className="flex flex-col w-full items-center justify-center space-y-6">
              <BioSection name={profile.name} bio={profile.bio} />
              <FavoritesSection projects={profile.favorites} />
            </div>
          </CardContent>
          <CardFooter className="">
            {user?.id === profile.id && (
              <Link href={"/profile/edit"}>
                <Button variant={"outline"}>
                  <span>Edit details</span>
                  <ArrowUpRight size={16} />
                </Button>
              </Link>
            )}
          </CardFooter>
        </Card>

        {/* Projects as creator */}
        <Card className="w-full shadow-none">
          <CardHeader>
            <CardTitle>Projects created</CardTitle>
            <CardDescription>
              List of projects created by the user.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center justify-center space-y-4">
            <ProjectsCreatedSection projects={profile.creatorProjects} />
          </CardContent>
        </Card>

        {/* Projects as collaborator */}
        <Card className="w-full shadow-none">
          <CardHeader>
            <CardTitle>Projects collaborated</CardTitle>
            <CardDescription>
              List of projects the user is collaborating on.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center justify-center space-y-4">
            <ProjectsCollaboratedSection
              projects={profile.collaborationProjects}
            />
          </CardContent>
        </Card>
      </div>
    );
  };

  useEffect(() => {
    if (data) {
      document.title = `${data.name}'s Profile`;
    }
  }, [data]);

  if (isLoading === true) {
    return <FetchingBlock message="Fetching profile details..." />;
  }

  if (error) {
    return <ErrorBlock message="Failed to fetch profile details" />;
  }

  if (!data) {
    return <ErrorBlock message="No profile details found" />;
  }

  return (
    <>
      {withWrapper ? (
        <WithWrapper title={data.name}>
          <Content profile={data} />
        </WithWrapper>
      ) : (
        <Content profile={data} />
      )}
    </>
  );
};

export default ProfileView;
