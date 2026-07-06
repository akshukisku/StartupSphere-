import AppSidebar from "@/components/AppSidebar";
import AdminHeader from "@/components/dashboard/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />

        <main className="flex min-h-screen w-full flex-col">
          <AdminHeader />

          <div className="flex-1 p-6">{children}</div>
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}