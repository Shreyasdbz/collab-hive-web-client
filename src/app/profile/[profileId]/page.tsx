import ProfileView from "@/components/pages/page-profile/profile-view.client";

const ProfileDetailsPage = async ({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) => {
  const profileId = (await params).profileId;

  return <ProfileView profileId={profileId} withWrapper={true} />;
};

export default ProfileDetailsPage;
