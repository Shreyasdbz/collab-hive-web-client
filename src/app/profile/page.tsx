import { Card } from "@/components/ui/card";
import ProfileView from "@/components/pages/page-profile/profile-view.client";
import AuthWrapper from "@/components/layout/auth-wrapper";
import SignOutButton from "@/components/pages/page-auth/sign-out-button.client";

const Profile = () => {
  return (
    <AuthWrapper pageTitle="My profile" redirectHref="profile">
      <ProfileView withWrapper={false} />
      <Card className="w-full flex items-center justify-center py-10 shadow-none">
        <SignOutButton />
      </Card>
    </AuthWrapper>
  );
};

export default Profile;
