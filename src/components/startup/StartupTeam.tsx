// "use client";

// import { useEffect } from "react";

// import DashboardCard from "@/components/common/DashboardCard";
// import SectionHeader from "@/components/common/SectionHeader";
// import { Button } from "@/components/ui/button";

// import { Plus } from "lucide-react";

// import { useStartupStore } from "@/store/useStartupStore";
// import TeamMemberCard from "./team/TeamMemberCard";


// const StartupTeam = () => {
// const teamMembers = useStartupStore(
//   (state) => state.teamMembers
// );

// const fetchTeamMembers = useStartupStore(
//   (state) => state.fetchTeamMembers
// );
//   useEffect(() => {
//     fetchTeamMembers();
//   }, [fetchTeamMembers]);

//   return (
//     <DashboardCard contentClassName="space-y-8">
//       <SectionHeader
//         title="Team Members"
//         description="Manage your startup team."
//         action={<AddTeamMemberDialog />}
//       />

//       {teamMembers.length === 0 ? (
//         <div className="flex h-48 items-center justify-center rounded-xl border border-dashed">
//           <div className="space-y-3 text-center">
//             <p className="text-muted-foreground">
//               No team members yet
//             </p>

//             <AddTeamMemberDialog />
//           </div>
//         </div>
//       ) : (
//         <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
//           {teamMembers.map((member) => (
//             <TeamMemberCard
//               key={member.id}
//               member={member}
//             />
//           ))}
//         </div>
//       )}
//     </DashboardCard>
//   );
// };

// export default StartupTeam;