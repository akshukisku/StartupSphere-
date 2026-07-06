"use client";

import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";

interface UploadAreaProps {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
  className?: string;
}

const UploadArea = ({
  title,
  description,
  buttonText = "Browse Files",
  onClick,
  className,
}: UploadAreaProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`group flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/20 transition-all duration-300 hover:border-primary hover:bg-primary/5 ${className}`}
    >
      <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground transition-transform duration-300 group-hover:scale-110" />

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-center text-sm text-muted-foreground">
        {description}
      </p>

      <Button
        type="button"
        variant="secondary"
        className="mt-6 rounded-xl"
        onClick={(e) => {
          e.stopPropagation();
          onClick?.();
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default UploadArea;