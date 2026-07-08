"use client";

import { Star } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";

interface FormStarRatingProps {
  name: string;
  label: string;
  max?: number;
}

const FormStarRating = ({
  name,
  label,
  max = 5,
}: FormStarRatingProps) => {
  const { control } = useFormContext();

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
  });

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
      </label>

      <div className="flex gap-2">
        {Array.from({ length: max }).map((_, index) => {
          const value = index + 1;

          return (
            <button
              key={value}
              type="button"
              onClick={() =>
                field.onChange(value)
              }
              className="transition-transform hover:scale-110"
            >
              <Star
                className={`h-7 w-7 ${
                  value <= field.value
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          );
        })}
      </div>

      {error && (
        <p className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormStarRating;