"use client";

import {
  RocketIcon,
  BrainIcon,
  AtomIcon,
} from "@animateicons/react/lucide";

const roles = [
  {
    label: "Founder",
    value: "founder",
    icon: RocketIcon,
  },
  {
    label: "Investor",
    value: "investor",
    icon: AtomIcon,
  },
  {
    label: "Mentor",
    value: "mentor",
    icon: BrainIcon,
  },
];

interface Props {
  value: string;
  onChange: (role: string) => void;
}

export default function RoleSelector({
  value,
  onChange,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {roles.map((role) => {
        const Icon = role.icon;

        const selected = value === role.value;

        return (
          <button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            className={`
              group
              flex
              h-28
              flex-col
              items-center
              justify-center
              rounded-2xl
              border
              transition-all
              duration-300

              ${
                selected
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                  : "border-border bg-card hover:border-primary/40 hover:bg-muted"
              }
            `}
          >
            <Icon
              size={32}
              className={`
                mb-3
                transition-all
                duration-300
                group-hover:scale-110

                ${
                  selected
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                }
              `}
            />

            <p
              className={`
                text-sm
                font-medium
                transition-colors
                duration-300

                ${
                  selected
                    ? "text-primary"
                    : "text-foreground group-hover:text-primary"
                }
              `}
            >
              {role.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}