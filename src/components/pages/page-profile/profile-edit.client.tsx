"use client";

import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import PageWrapper from "@/components/layout/page-wrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useGetProfileDetails from "@/hooks/queries/use-get-profile-details";
import ProfileDetailsEditForm from "./profile-details-edit-form.client";

const ProfileEdit = ({ profileId }: { profileId: string }) => {
  const { data, error, isLoading } = useGetProfileDetails({
    profileId,
  });

  if (isLoading) {
    return (
      <PageWrapper title="Edit profile">
        <FetchingBlock
          className="w-full rounded-lg min-h-32"
          message="Loading profile ..."
        />
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper title="Edit profile">
        <ErrorBlock
          className="w-full rounded-lg min-h-32"
          message="Failed to load profile"
        />
      </PageWrapper>
    );
  }

  if (!data) {
    return <></>;
  }

  return (
    <PageWrapper title="Edit profile">
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Edit your profile details here</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileDetailsEditForm initialDetails={data} />
        </CardContent>
      </Card>
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>Edit your social links here</CardDescription>
        </CardHeader>
      </Card>
    </PageWrapper>
  );
};

export default ProfileEdit;
