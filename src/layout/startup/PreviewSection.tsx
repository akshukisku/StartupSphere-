"use client";

import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const PreviewSection = ({
  title,
  description,
  children,
  className,
}: Props) => {
  return (
    <section
      className={cn(
        "rounded-3xl border bg-card p-8 shadow-sm",
        className
      )}
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight">
          {title}
        </h2>

        {description && (
          <p className="mt-2 text-muted-foreground">
            {description}
          </p>
        )}
      </div>

      {children}
    </section>
  );
};

export default PreviewSection;