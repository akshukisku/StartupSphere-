"use client";

import { Pie, PieChart, Cell, Label } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import ChartCard from "./ChartCard";
import ChartStat from "./ChartStat";

interface FundingOverviewChartProps {
  pending: number;
  accepted: number;
  rejected: number;
}

const chartConfig = {
  pending: {
    label: "Pending",
    color: "#EAB308",
  },
  accepted: {
    label: "Accepted",
    color: "#22C55E",
  },
  rejected: {
    label: "Rejected",
    color: "#EF4444",
  },
} satisfies ChartConfig;

const FundingOverviewChart = ({
  pending,
  accepted,
  rejected,
}: FundingOverviewChartProps) => {
  const data = [
    {
      status: "pending",
      count: pending,
      fill: chartConfig.pending.color,
    },
    {
      status: "accepted",
      count: accepted,
      fill: chartConfig.accepted.color,
    },
    {
      status: "rejected",
      count: rejected,
      fill: chartConfig.rejected.color,
    },
  ];

  const total = pending + accepted + rejected;

  return (
    <ChartCard
      title="Funding Overview"
      description="Distribution of investment request statuses."
    >
      <div className="grid h-full items-center gap-8 lg:grid-cols-2">
        {/* Left Side */}

        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[240px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />

            <Pie
          innerRadius={58}
outerRadius={82}
cornerRadius={10}
paddingAngle={5}
strokeWidth={2}
stroke="hsl(var(--background))"
            >
              {/* Cells */}

              {/* Label */}
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Right Side */}

        <div className="space-y-4">
          <ChartStat color="bg-green-500" title="Accepted" value={accepted} />

          <ChartStat color="bg-yellow-500" title="Pending" value={pending} />

          <ChartStat color="bg-red-500" title="Rejected" value={rejected} />

          <div className="flex items-center justify-between border-t pt-4">
            <span>Total Requests</span>

            <span className="text-xl font-bold">{total}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-6 grid grid-cols-3 gap-3">
        {data.map((item) => (
          <div
            key={item.status}
            className="rounded-xl border border-border/50 bg-muted/30 p-3 text-center"
          >
            <div
              className="mx-auto mb-2 h-3 w-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />

            <p className="text-xs capitalize text-muted-foreground">
              {item.status}
            </p>

            <p className="mt-1 text-xl font-bold">{item.count}</p>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

export default FundingOverviewChart;
