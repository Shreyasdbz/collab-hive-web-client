import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

const ErrorBlock = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center flex-row gap-2 text-destructive py-20",
        className || ""
      )}
    >
      <CircleX size={20} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorBlock;
