"use client";

import { useMentorProfile } from "@/hooks/mentor/useMentor";
import CreateMentorProfile from "./profile/CreateMentorProfile";
import EditMentorProfile from "./profile/EditMentorProfile";
import MentorProfileSkeleton from "@/components/skeleton/MentorProfileSekeleton";

const MentorProfile = () => {
  const {
    data,
    isPending,
    isError,
  } = useMentorProfile();

  if (isPending) {
    return <MentorProfileSkeleton/>;
  }

  if (isError) {
    return <div>Failed to load mentor profile.</div>;
  }

  if (!data) {
    return <CreateMentorProfile />;
  }

  return <EditMentorProfile mentor={data} />;
};

export default MentorProfile;