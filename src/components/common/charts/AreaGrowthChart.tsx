"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MonthlyGrowth } from "@/types/interface/admin.interface";

import ChartCard from "./ChartCard";

const chartConfig = {
  users: {
    label: "Users",
    color:"#8B5CF6",
  },
} satisfies ChartConfig;

interface AreaGrowthChartProps {
  data: MonthlyGrowth[];
}

const AreaGrowthChart = ({ data }: AreaGrowthChartProps) => {
  return (
    <ChartCard
      title="Platform Growth"
      description="User growth during the last 6 months."
    >
      <ChartContainer config={chartConfig} className="h-full w-full">
        <AreaChart
          accessibilityLayer
          data={data}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <defs>
            <linearGradient id="fillUsers" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-users)"
                stopOpacity={0.8}
              />

              <stop
                offset="95%"
                stopColor="var(--color-users)"
                stopOpacity={0.05}
              />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            tick={{ fontSize: 12 }}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="users"
            type="monotone"
            fill="url(#fillUsers)"
            stroke="var(--color-users)"
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 6,
            }}
          />
        </AreaChart>
      </ChartContainer>
    </ChartCard>
  );
};

export default AreaGrowthChart;
