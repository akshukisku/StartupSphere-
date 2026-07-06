
import { AppSidebar } from "@/components/AppSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

export default function FounderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <DashboardHeader
          title="Founder Dashboard"
        />

        <main className="p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}