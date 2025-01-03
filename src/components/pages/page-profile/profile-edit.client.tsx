import PageWrapper from "@/components/layout/page-wrapper";

const ProfileEdit = ({ profileId }: { profileId: string }) => {
  return (
    <PageWrapper>
      <div>
        <h1>prfile</h1>
        <p>profileId: {profileId}</p>
      </div>
    </PageWrapper>
  );
};

export default ProfileEdit;
