import { CircleCheck, CircleMinus } from "lucide-react";
import { ICreatorProjectCard } from "@/models/Project";
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

const CreatorProjectCard = (props: ICreatorProjectCard) => {
  return (
    <Link href={`/projects/${props.id}`} className="w-full min-w-fit lg:w-fit">
      <Card className="bg-accent/30 shadow-sm lg:pr-20 w-full lg:w-fit min-w-fit hover:bg-accent/75">
        <CardHeader>
          <CardTitle className="lg:whitespace-nowrap">{props.name}</CardTitle>
          <CardDescription>
            <Badge
              className="gap-1"
              variant={
                props.isOpen === true
                  ? "collaborationActive"
                  : "collaborationInactive"
              }
            >
              {props.isOpen === true ? (
                <CircleCheck size={14} />
              ) : (
                <CircleMinus size={14} />
              )}
              {props.isOpen === true ? "Open" : "Closed"}
            </Badge>
          </CardDescription>
        </CardHeader>
        <CardContent className="lg:min-h-14 justify-start items-center flex flex-row">
          <p className="lg:whitespace-nowrap text-lg font-light">
            {props.technologyStackText}
          </p>
        </CardContent>
        <CardFooter className="lg:min-h-12 justify-start items-center flex flex-row">
          <span className="text-secondary-foreground/75">
            {props.collaboratorsText}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CreatorProjectCard;
