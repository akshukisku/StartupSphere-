interface ChartStatProps {
  color: string;
  title: string;
  value: number;
}

const ChartStat = ({
  color,
  title,
  value,
}: ChartStatProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/50 bg-muted/30 px-4 py-3">
      <div className="flex items-center gap-3">
        <div
          className={`h-3 w-3 rounded-full ${color}`}
        />

        <span className="text-sm font-medium">
          {title}
        </span>
      </div>

      <span className="text-lg font-bold">
        {value}
      </span>
    </div>
  );
};

export default ChartStat;