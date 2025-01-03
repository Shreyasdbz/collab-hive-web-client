import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        outlineStrong:
          "border-primary/50 bg-transparent text-primary text-xs font-semibold",
        collaborationActive:
          "border-transparent bg-emerald-200 dark:bg-emerald-800 text-primary text-sm text-emerald-800 dark:text-emerald-200",
        collaborationInactive:
          "border-transparent bg-neutral-200 dark:bg-neutral-800 text-primary text-sm text-neutral-800 dark:text-neutral-200",
        // projectCreator:
        //   "border-transparent bg-primary text-primary-foreground text-sm",
        projectCreator:
          "border-transparent bg-secondary-foreground/80 text-primary-foreground text-sm",
        favorites:
          "border-transparent bg-neutral-200 dark:bg-neutral-700 text-red-600 dark:text-red-400 text-sm rounded-full gap-1 font-normal text-xs",
        profileLink:
          "border-primary/65 bg-transparent text-primary text-sm font-semibold",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
