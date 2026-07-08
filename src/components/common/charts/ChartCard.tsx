import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ChartCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

const ChartCard = ({
  title,
  description,
  children,
}: ChartCardProps) => {
  return (
    <Card className="h-full overflow-hidden rounded-xl border border-border/50 shadow-sm">
      <CardHeader className="space-y-1 pb-3">
        <CardTitle className="text-lg font-semibold">
          {title}
        </CardTitle>

        {description && (
          <CardDescription className="text-sm">
            {description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="h-[360px] pt-0">
        {children}
      </CardContent>
    </Card>
  );
};

export default ChartCard;