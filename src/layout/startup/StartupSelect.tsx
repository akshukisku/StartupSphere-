"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StartupSelectProps {
  label: string;
  placeholder: string;
  value?: string;
  options: string[];
  onChange: (value: string) => void;
}

const StartupSelect = ({
  label,
  placeholder,
  value,
  options,
  onChange,
}: StartupSelectProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">
        {label}
      </label>

      <Select
        value={value}
        onValueChange={onChange}
      >
        <SelectTrigger className="h-11">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option}
              value={option}
            >
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default StartupSelect;