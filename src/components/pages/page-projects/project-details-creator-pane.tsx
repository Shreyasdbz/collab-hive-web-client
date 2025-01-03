import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { GetProjectDetailsResponseDtoPerson } from "@/models/project-dtos";
import { ArrowUpRight, UserCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ProjectDetailsCreatorPane = ({
  creator,
  className,
}: {
  creator: GetProjectDetailsResponseDtoPerson;
  className?: string;
}) => {
  return (
    <Card className={cn("shadow-none h-full", className && className)}>
      <CardHeader>
        <CardTitle className="whitespace-nowrap">Creator</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row items-center justify-start space-x-0">
        {creator.avatarUrl ? (
          <Image
            src={creator.avatarUrl}
            alt={`${creator.name}'s avatar`}
            height={44}
            width={44}
            className="rounded-full shadow-sm"
          />
        ) : (
          <UserCircle size={44} />
        )}
        <Link
          href={`/profile/${creator.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant={"link"} className="text-lg font-medium">
            {creator.name}
            <ArrowUpRight size={24} />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProjectDetailsCreatorPane;
