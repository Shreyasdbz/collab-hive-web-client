import ProfileEdit from "@/components/pages/page-profile/profile-edit.client";

const ProfileEditPage = async ({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) => {
  const profileId = (await params).profileId;

  return <ProfileEdit profileId={profileId} />;
};

export default ProfileEditPage;
