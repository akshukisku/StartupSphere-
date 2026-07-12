"use client";

import DashboardCard from "@/components/common/DashboardCard";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface FundingOverviewChartProps {
  pending: number;
  accepted: number;
  rejected: number;
}

const COLORS = [
  "#EAB308", // Yellow
  "#22C55E", // Green
  "#EF4444", // Red
];

const FundingOverviewChart = ({
  pending,
  accepted,
  rejected,
}: FundingOverviewChartProps) => {
  const data = [
    {
      name: "Pending",
      value: pending,
    },
    {
      name: "Accepted",
      value: accepted,
    },
    {
      name: "Rejected",
      value: rejected,
    },
  ];

  return (
    <DashboardCard className="p-6">
      <div className="space-y-5">
        <div>
          <h3 className="text-xl font-semibold">
            Funding Overview
          </h3>

          <p className="text-sm text-muted-foreground">
            Distribution of investment requests.
          </p>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardCard>
  );
};

export default FundingOverviewChart;