"use client";

import { ICollaboratorProjectCard } from "@/models/Project";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import CollaboratorProjectCard from "./collaborator-project-card";
import NoProjects from "./no-projects";
import useGetCollaboratorProjectCards from "@/hooks/queries/use-get-dashboard-project-collaborator-cards";

const CollaboratorProjectsSectionClient = () => {
  const { data, error, isLoading } = useGetCollaboratorProjectCards();

  const Fetching = () => {
    return (
      <FetchingBlock message="Fetching your projects" className="rounded-lg" />
    );
  };

  const Error = ({ message }: { message: string }) => {
    return <ErrorBlock message={message} className="rounded-lg" />;
  };

  const Projects = ({
    projectsList,
  }: {
    projectsList: ICollaboratorProjectCard[];
  }) => {
    return (
      <ScrollArea id="projects-section-wrapper-scroll-content ">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center lg:justify-start py-4 pb-8 gap-2 lg:gap-2 lg:pl-5">
          {projectsList.map((project) => (
            <CollaboratorProjectCard key={project.id} {...project} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  };

  const EmptyProjects = () => {
    return <NoProjects text="No collaboration projects found" />;
  };

  if (isLoading) {
    return <Fetching />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  if (data) {
    if (data.length > 0) {
      return <Projects projectsList={data} />;
    } else {
      return <EmptyProjects />;
    }
  }

  return <></>;
};

export default CollaboratorProjectsSectionClient;
