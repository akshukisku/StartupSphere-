import MentorSessionList from "@/layout/mentor/session/MentorSessionList";

const MentorSessionPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Mentorship Sessions
        </h1>

        <p className="text-muted-foreground">
          Manage your upcoming, completed, and cancelled mentorship sessions.
        </p>
      </div>

      <MentorSessionList />
    </div>
  );
};

export default MentorSessionPage;