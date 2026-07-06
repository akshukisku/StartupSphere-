"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

interface FormTextareaProps {
  name: string;
  label: string;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
}

const FormTextarea = ({
  name,
  label,
  placeholder,
  rows = 5,
  disabled = false,
  className,
}: FormTextareaProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="space-y-2">
      <Label
        htmlFor={name}
        className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
      >
        {label}
      </Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            id={name}
            value={field.value ?? ""}
            rows={rows}
            placeholder={placeholder}
            disabled={disabled}
            className={cn("min-h-32 rounded-xl resize-none", className)}
          />
        )}
      />

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default FormTextarea;
