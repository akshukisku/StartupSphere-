import AppSidebar from '@/components/AppSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const MentorLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
      <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <DashboardHeader
          title="Mentor Dashboard"
        />

        <main className="p-4">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MentorLayout