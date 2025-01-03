import React from "react";
import { cn } from "@/lib/utils";

export default function H3({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className && className
      )}
    >
      {children}
    </h3>
  );
}
