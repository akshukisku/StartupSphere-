"use client";

import { Badge } from "@/components/ui/badge";
import { TableColumn } from "@/types/type/table.type";
import InvestmentActions from "./InvestmentActions";

export interface FounderInvestmentRow {
  id: string;

  startup_name: string;

  amount: number;

  equity_offer: number;

  status: string;

  message: string;

  created_at: string;

  investor: {
    id: string;
    full_name: string;
    email: string;
  };
}

export const investmentColumns: TableColumn<FounderInvestmentRow>[] = [
  {
    key: "investor",
    header: "Investor",

    render: (row: FounderInvestmentRow) => (
      <div>
        <p className="font-medium">{row.investor.full_name}</p>

        <p className="text-xs text-muted-foreground">{row.investor.email}</p>
      </div>
    ),
  },

  {
    key: "startup_name",
    header: "Startup",
    sortable: true,
  },

  {
    key: "amount",
    header: "Investment",

    sortable: true,

    render: (row: FounderInvestmentRow) => <>₹{row.amount.toLocaleString()}</>,
  },

  {
    key: "equity_offer",
    header: "Equity",

    sortable: true,

    render: (row: FounderInvestmentRow) => <>{row.equity_offer}%</>,
  },
  {
    key: "message",
    header: "Message",

    render: (row: FounderInvestmentRow) => (
      <p className="max-w-xs truncate text-sm text-muted-foreground">
        {row.message}
      </p>
    ),
  },
  {
    key: "status",
    header: "Status",

    render: (row: FounderInvestmentRow) => {
      const status = row.status.toLowerCase();

      const className =
        status === "accepted"
          ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/15 dark:text-green-400 dark:border-green-500/30"
          : status === "rejected"
            ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/15 dark:text-red-400 dark:border-red-500/30"
            : "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/15 dark:text-yellow-400 dark:border-yellow-500/30";

      return (
        <Badge variant="outline" className={className}>
          {row.status}
        </Badge>
      );
    },
  },
  {
    key: "id",
    header: "Actions",

    render: (row: FounderInvestmentRow) => <InvestmentActions request={row} />,
  },
];
