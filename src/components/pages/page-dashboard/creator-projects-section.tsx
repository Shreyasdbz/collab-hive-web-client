import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreatorProjectsSectionClient from "./creator-projects-section.client";
import CreateProjectDialog from "../page-projects/details/create-project-dialog.client";

const CreatorProjectsSection = () => {
  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle>My projects</CardTitle>
        <CardDescription>All the projects you&apos;ve created</CardDescription>
      </CardHeader>
      <CardContent className="w-full lg:px-0">
        <CreatorProjectsSectionClient />
      </CardContent>
      <CardFooter>
        <CreateProjectDialog useFullWidthButton={false} />
      </CardFooter>
    </Card>
  );
};

export default CreatorProjectsSection;
