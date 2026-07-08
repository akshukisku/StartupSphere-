"use client";

const MentorUpcomingSessions = () => {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold">
          Upcoming Sessions
        </h2>

        <p className="text-muted-foreground">
          Your scheduled mentoring sessions.
        </p>
      </div>

      <div className="rounded-xl border border-dashed p-10 text-center">
        <p className="text-muted-foreground">
          No upcoming sessions scheduled.
        </p>
      </div>
    </section>
  );
};

export default MentorUpcomingSessions;