"use client";

import { useFormContext, Controller, FieldValues, Path } from "react-hook-form";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FormSwitchProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  description?: string;
  disabled?: boolean;
}

const FormSwitch = <T extends FieldValues>({
  name,
  label,
  description,
  disabled = false,
}: FormSwitchProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name];

  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex items-center justify-between rounded-xl border p-4">
            <div className="space-y-1">
              <Label>{label}</Label>

              {description && (
                <p className="text-sm text-muted-foreground">
                  {description}
                </p>
              )}
            </div>

            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </div>
        )}
      />

      {error && (
        <p className="text-sm text-destructive">
          {String(error.message)}
        </p>
      )}
    </div>
  );
};

export default FormSwitch;