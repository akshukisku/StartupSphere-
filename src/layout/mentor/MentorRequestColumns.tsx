"use client";

import { Badge } from "@/components/ui/badge";
import { TableColumn } from "@/types/type/table.type";
import MentorActions from "./MentorActions";
import { MentorRequestRow } from "@/types/interface/mentor.interface";




export const mentorRequestColumns: TableColumn<MentorRequestRow>[] = [
  {
    key: "startup",
    header: "Startup",

    render: (row: MentorRequestRow) => (
      <div>
        <p className="font-medium">
          {row.startup?.startup_name}
        </p>

        <p className="text-xs text-muted-foreground">
          {row.startup?.industry}
        </p>
      </div>
    ),
  },

  {
    key: "founder",
    header: "Founder",

    render: (row: MentorRequestRow) => (
      <div>
        <p className="font-medium">
          {row.founder?.full_name}
        </p>

        <p className="text-xs text-muted-foreground">
          {row.founder?.email}
        </p>
      </div>
    ),
  },

  {
    key: "message",
    header: "Message",

    render: (row: MentorRequestRow) => (
      <p className="max-w-xs truncate text-sm text-muted-foreground">
        {row.message}
      </p>
    ),
  },

  {
    key: "status",
    header: "Status",

    render: (row: MentorRequestRow) => {
      const status = row.status.toLowerCase();

      const className =
        status === "accepted"
          ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/15 dark:text-green-400 dark:border-green-500/30"
          : status === "rejected"
            ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30"
            : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-400 dark:border-yellow-500/30";

      return (
        <Badge
          variant="outline"
          className={className}
        >
          {row.status}
        </Badge>
      );
    },
  },

  {
    key: "created_at",
    header: "Requested On",

    sortable: true,

    render: (row: MentorRequestRow) => (
      <>
        {new Date(
          row.created_at
        ).toLocaleDateString()}
      </>
    ),
  },

  {
    key: "id",
    header: "Actions",

    render: (row: MentorRequestRow) => (
      <MentorActions request={row} />
    ),
  },
];