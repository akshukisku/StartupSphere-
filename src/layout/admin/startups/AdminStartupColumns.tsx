import { Badge } from "@/components/ui/badge";
import { AdminStartup } from "@/types/interface/admin.interface";
import { TableColumn } from "@/types/type/table.type";
import AdminStartupActions from "./AdminStartupActions";


export const startupColumns: TableColumn<AdminStartup>[] = [
  {
    header: "Startup",
    key: "startup_name",
  },

  {
    header: "Industry",
    key: "industry",
  },

  {
    header: "Founder",
    key: "founder",
    render: (row) => row.founder.full_name,
  },

  {
    header: "Submitted",
    key: "submitted_at",
    render: (row) =>
      row.submitted_at
        ? new Date(row.submitted_at).toLocaleDateString()
        : "-",
  },

  {
    header: "Status",
    key: "status",
    render: (row) => (
      <Badge variant="secondary">
        {row.status}
      </Badge>
    ),
  },

  {
    header: "Actions",
    key: "id",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (row) => (
      <AdminStartupActions startup={row} />
    ),
  },
];