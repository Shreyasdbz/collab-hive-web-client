import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CollaboratorProjectsSectionClient from "./collaborator-projects-section.client";

const CollaboratorProjectsSection = () => {
  return (
    <Card className="w-full shadow-none">
      <CardHeader>
        <CardTitle>My collaborations</CardTitle>
        <CardDescription>
          All the projects you&apos;re collaborating on
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full lg:px-0">
        <CollaboratorProjectsSectionClient />
      </CardContent>
      <CardFooter>{/* Add project button */}</CardFooter>
    </Card>
  );
};

export default CollaboratorProjectsSection;
