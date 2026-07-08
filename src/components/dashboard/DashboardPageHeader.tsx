interface DashboardPageHeaderProps {
  title: string;
  description: string;
}

const DashboardPageHeader = ({
  title,
  description,
}: DashboardPageHeaderProps) => {
  return (
    <div className="space-y-2">
      <span className="text-sm font-medium uppercase tracking-wider text-primary">
        Dashboard
      </span>

      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h1>

      <p className="max-w-2xl text-muted-foreground">
        {description}
      </p>
    </div>
  );
};

export default DashboardPageHeader;