"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

const SectionHeader = ({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) => {
  return (
    <div
      className={cn(
        "mb-8 flex items-start justify-between gap-4",
        className
      )}
    >
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
};

export default SectionHeader;