import { cn } from "@/lib/utils";
import React from "react";

export function MutedText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("text-sm text-muted-foreground", className && className)}
    >
      {children}
    </span>
  );
}
