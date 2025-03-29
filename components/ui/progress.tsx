"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressProps {
  value?: number;
  className?: string;
}

const Progress: React.FC<ProgressProps> = ({
  value = 0,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-gray-200",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-blue-600 transition-all"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
      />
    </div>
  );
};

export { Progress };
