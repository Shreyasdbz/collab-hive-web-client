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
import ProfileEditDetailsForm from "./profile-edit-details-form.client";
import DeleteLinkDialog from "@/components/common/delete-link-dialog.client";
import ProfileEditLinkCreateDialogForm from "./profile-edit-link-create-dialog-form.client";

const ProfileEdit = ({ profileId }: { profileId: string | undefined }) => {
  const { data, error, isLoading } = useGetProfileDetails({
    profileId: profileId !== undefined && profileId !== "" ? profileId : "me",
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
      {/* Details */}
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Details</CardTitle>
          <CardDescription>Edit your profile details here</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileEditDetailsForm initialDetails={data} />
        </CardContent>
      </Card>
      {/* Links */}
      <Card className="w-full shadow-none">
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>Edit your social links here</CardDescription>
          <div className="w-full flex flex-wrap gap-1">
            <ProfileEditLinkCreateDialogForm />
            {data.links &&
              data.links.map((link) => (
                <DeleteLinkDialog
                  projectId=""
                  key={link.id}
                  linkId={link.id}
                  linkType={link.linkType}
                  linkTitle={link.linkTitle}
                  linkUrl={link.linkUrl}
                  domain="profile"
                  redirectUrl="/profile/edit"
                />
              ))}
          </div>
        </CardHeader>
      </Card>
    </PageWrapper>
  );
};

export default ProfileEdit;
