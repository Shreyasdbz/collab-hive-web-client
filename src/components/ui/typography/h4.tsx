import React from "react";
import { cn } from "@/lib/utils";

export default function H4({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className && className
      )}
    >
      {children}
    </h4>
  );
}
