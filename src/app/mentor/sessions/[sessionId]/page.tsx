import MentorSessionDetails from "@/layout/mentor/session/MentorSessionDetails";

interface PageProps {
  params: Promise<{
    sessionId: string;
  }>;
}

const MentorSessionPage = async ({ params }: PageProps) => {
  const { sessionId } = await params;

  console.log("Route sessionId:", sessionId);

  return (
    <MentorSessionDetails
      sessionId={sessionId}
    />
  );
};

export default MentorSessionPage;