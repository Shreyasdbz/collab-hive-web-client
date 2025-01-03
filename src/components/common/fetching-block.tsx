import { cn } from "@/lib/utils";

const FetchingBlock = ({
  message,
  className,
}: {
  message: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center flex-row gap-2 bg-accent/50 text-accent-foreground/75 py-20",
        className || ""
      )}
    >
      {/* Loading spinner */}
      <svg
        className="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          strokeLinecap="round"
        ></path>
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default FetchingBlock;
