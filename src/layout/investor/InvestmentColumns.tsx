"use client";

import { Badge } from "@/components/ui/badge";
import { TableColumn } from "@/types/type/table.type";
import InvestmentActions from "./InvestmentActions";

export interface InvestorInvestmentRow {
  id: string;

  amount: number;

  equity_offer: number;

  status: string;

  message: string;

  created_at: string;

  startup: {
    id: string;
    startup_name: string;
    logo_url: string | null;
    industry: string;
    funding_stage: string;
  };
}

export const investmentColumns: TableColumn<InvestorInvestmentRow>[] = [
  {
    key: "startup",
    header: "Startup",

    render: (row) => (
      <div>
        <p className="font-medium">
          {row.startup.startup_name}
        </p>

        <p className="text-xs text-muted-foreground">
          {row.startup.industry}
        </p>
      </div>
    ),
  },

  {
    key: "amount",
    header: "Investment",
    sortable: true,

    render: (row) => (
      <>₹{row.amount.toLocaleString()}</>
    ),
  },

  {
    key: "equity_offer",
    header: "Equity",
    sortable: true,

    render: (row) => (
      <>{row.equity_offer}%</>
    ),
  },

  {
    key: "status",
    header: "Status",

    render: (row) => {
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

    render: (row) =>
      new Date(row.created_at).toLocaleDateString(),
  },
  {
  key: "id",
  header: "Actions",

  render: (row) => (
    <InvestmentActions
      request={row}
    />
  ),
},
];