"use client";

import MentorAssignedStartups from "./MentorAssignedStartups";
import MentorStats from "./MentorStats";
import MentorUpcomingSessions from "./MentorUpcomingSessions";
import MentorWelcome from "./MentorWelcome";


const MentorDashboard = () => {
  return (
    <div className="space-y-8">
      <MentorWelcome />

      <MentorStats />

      <MentorAssignedStartups />

      <MentorUpcomingSessions />
    </div>
  );
};

export default MentorDashboard;