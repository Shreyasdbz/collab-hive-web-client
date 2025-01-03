import React from "react";
import { cn } from "@/lib/utils";

export default function H2({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className && className
      )}
    >
      {children}
    </h2>
  );
}
