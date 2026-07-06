"use client";

import { RocketIcon, BrainIcon, AtomIcon } from "@animateicons/react/lucide";

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

export default function RoleSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {roles.map((role) => {
        const Icon = role.icon;

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
  value === role.value
    ? "border-lime-400 bg-lime-400/10 shadow-lg shadow-lime-500/20"
    : "border-slate-700 bg-slate-900/60 hover:border-slate-500"
}
`}
          >
            <Icon
              size={32}
              className={`
    mb-3
    transition-all
    duration-300

    ${value === role.value ? "text-lime-400" : "text-slate-300"}
  `}
            />

            <p
              className={`text-sm font-medium ${
                value === role.value ? "text-lime-400" : "text-white"
              }`}
            >
              {role.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}
