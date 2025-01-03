import { User } from "lucide-react";
import { ICollaboratorProjectCard } from "@/models/Project";
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

const CollaboratorProjectCard = (props: ICollaboratorProjectCard) => {
  return (
    <Link href={`/projects/${props.id}`} className="w-full min-w-fit lg:w-fit">
      <Card className="bg-accent/30 shadow-sm lg:pr-20 w-full min-w-fit hover:bg-accent/75">
        <CardHeader>
          <CardTitle>{props.name}</CardTitle>
          <CardDescription>
            <Badge className="gap-1" variant={"projectCreator"}>
              <User size={14} />
              <span>{props.creatorName}</span>
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="lg:whitespace-nowrap text-lg font-light">
            {props.technologyStackText}
          </p>
        </CardContent>
        <CardFooter>
          <span className="text-secondary-foreground/75">
            {props.collaboratorsText}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CollaboratorProjectCard;
