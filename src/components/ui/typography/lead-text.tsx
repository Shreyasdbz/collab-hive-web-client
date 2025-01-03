import { cn } from "@/lib/utils";
import React from "react";

export function LeadText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("text-xl text-muted-foreground", className && className)}>
      {children}
    </p>
  );
}
