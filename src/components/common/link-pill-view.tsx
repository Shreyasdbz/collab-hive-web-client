import Link from "next/link";
import { Button } from "../ui/button";
import { LinkAttachmentIcon } from "./link-attachment-icon";

const LinkPillView = ({
  type,
  title,
  url,
}: {
  type: string;
  title: string;
  url: string;
}) => {
  return (
    <Link href={url} target="_blank" rel="noopener noreferrer">
      <Button variant={"outline"} className="rounded-full">
        <LinkAttachmentIcon id={type} size={16} className="" />
        <span>{title}</span>
      </Button>
    </Link>
  );
};

export default LinkPillView;
