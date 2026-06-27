import { Card } from "@heroui/react";
import { FaArrowTrendUp } from "react-icons/fa6";

const DashboardStatCard = ({
  title,
  value,
  icon: Icon,
  growth,
  iconBg,
  iconColor,
}) => {
  return (
    <Card className="rounded-3xl border border-default-200 bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${iconBg}`}
        >
          <Icon className={`text-2xl ${iconColor}`} />
        </div>

        <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
          <FaArrowTrendUp className="text-xs" />
          <span>{growth}</span>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium text-default-500">{title}</p>

        <h2 className="mt-2 text-4xl font-bold tracking-tight">{value}</h2>
      </div>
    </Card>
  );
};

export default DashboardStatCard;
