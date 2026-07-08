"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import ChartCard from "./ChartCard";
import { StartupStatus } from "@/types/interface/admin.interface";

interface StartupStatusChartProps {
  data: StartupStatus[];
}

const chartConfig = {
  count: {
    label: "Startups",
    color: "#10B981",
  },
} satisfies ChartConfig;

const StartupStatusChart = ({
  data,
}: StartupStatusChartProps) => {

    console.log(data);
  if (!data.length) {
    return (
      <ChartCard
        title="Startup Status"
        description="Approval status of startups."
      >
        <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
          No data available.
        </div>
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title="Startup Status"
      description="Approval status of startups."
    >
      <ChartContainer
        config={chartConfig}
        className="h-full w-full"
      >
        <BarChart
          accessibilityLayer
          data={data}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="status"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />

          <Bar
            dataKey="count"
            radius={8}
            fill="var(--color-count)"
          />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
};

export default StartupStatusChart;