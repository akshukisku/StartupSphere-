"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "Pending", value: 5 },
  { name: "Accepted", value: 8 },
  { name: "Rejected", value: 2 },
];

const COLORS = ["#EAB308", "#22C55E", "#EF4444"];

export default function TestChart() {
  return (
    <div className="p-10">
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          cx={200}
          cy={150}
          outerRadius={100}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}