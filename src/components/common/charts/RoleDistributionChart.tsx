"use client";

import { Pie, PieChart, Cell } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import ChartCard from "./ChartCard";
import { RoleDistribution } from "@/types/interface/admin.interface";

interface RoleDistributionChartProps {
  data: RoleDistribution[];
}

const COLORS = ["#3b82f6", "#10b981", "#8b5cf6"];

const chartConfig = {
  founder: {
    label: "Founder",
    color: "#3b82f6",
  },
  mentor: {
    label: "Mentor",
    color: "#10b981",
  },
  investor: {
    label: "Investor",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

const RoleDistributionChart = ({ data }: RoleDistributionChartProps) => {
  if (!data.length) {
    return (
      <ChartCard
        title="User Distribution"
        description="Platform users by role."
      >
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          No data available.
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard title="User Distribution" description="Platform users by role.">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Pie
            data={data}
            dataKey="count"
            nameKey="role"
            innerRadius={65}
            outerRadius={105}
            paddingAngle={4}
            cornerRadius={8}
            strokeWidth={2}
          >
            {data.map((entry) => {
              const key = entry.role.toLowerCase() as keyof typeof chartConfig;

              return <Cell key={entry.role} fill={chartConfig[key]?.color} />;
            })}
          </Pie>
        </PieChart>
      </ChartContainer>
    </ChartCard>
  );
};

export default RoleDistributionChart;
