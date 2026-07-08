interface DashboardStatsGridProps {
  children: React.ReactNode;
}

const DashboardStatsGrid = ({
  children,
}: DashboardStatsGridProps) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        2xl:grid-cols-4
      "
    >
      {children}
    </div>
  );
};

export default DashboardStatsGrid;