"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
interface AdminToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;

  children?: React.ReactNode;

  onReset?: () => void; // NEW
}
const AdminToolbar = ({
  search,
  onSearchChange,
  placeholder = "Search...",
  children,
  onReset,
}: AdminToolbarProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={placeholder}
          className="pl-9"
        />
      </div>

      <div className="flex items-center gap-2">{children}
         {onReset && (
    <Button
      variant="outline"
      onClick={onReset}
    >
      Reset
    </Button>
  )}
      </div>
    </div>
  );
};

export default AdminToolbar;
