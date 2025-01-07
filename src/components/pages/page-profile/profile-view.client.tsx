"use client";

import { useEffect } from "react";
import ErrorBlock from "@/components/common/error-block";
import FetchingBlock from "@/components/common/fetching-block";
import useGetProfileDetails from "@/hooks/queries/use-get-profile-details";
import useUser from "@/providers/UserProvider";
import PageWrapper from "@/components/layout/page-wrapper";
import ProfileViewDetails from "./profile-view-details.client.";

const ProfileView = ({
  profileId,
  withWrapper,
}: {
  profileId?: string;
  withWrapper: boolean;
}) => {
  const { user } = useUser();
  const { data, error, isLoading } = useGetProfileDetails({
    profileId: profileId || "me",
  });

  const WithWrapper = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => {
    return <PageWrapper title={title}>{children}</PageWrapper>;
  };

  useEffect(() => {
    if (data) {
      document.title = `${data.name}'s Profile`;
    }
  }, [data]);

  if (isLoading === true) {
    return <FetchingBlock message="Fetching profile details..." />;
  }

  if (error) {
    return <ErrorBlock message="Failed to fetch profile details" />;
  }

  if (!data) {
    return <ErrorBlock message="No profile details found" />;
  }

  return (
    <>
      {withWrapper ? (
        <WithWrapper title={data.name}>
          <ProfileViewDetails
            profile={data}
            showEditButton={user?.id === data.id}
          />
        </WithWrapper>
      ) : (
        <ProfileViewDetails
          profile={data}
          showEditButton={user?.id === data.id}
        />
      )}
    </>
  );
};

export default ProfileView;
