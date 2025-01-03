"use client";

import { v4 as uuidv4 } from "uuid";
import axiosClient from "@/lib/axios";
import { GetProfileDetailsResponseDto } from "@/models/profile-dtos";
import useUser from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";

export type QueryArgs = {
  profileId?: string;
};

/**
 * Hook to fetch profile details
 */
export default function useGetProfileDetails(args: QueryArgs) {
  const { session } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: ["profile-details", args.profileId, session?.access_token],
    queryFn: () => getProfileDetails(args, session?.access_token),
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}

async function getProfileDetails(
  args: QueryArgs,
  accessToken: string | undefined
): Promise<GetProfileDetailsResponseDto> {
  try {
    const profileIdToUse = args.profileId === undefined ? "me" : args.profileId;
    const correlationId = uuidv4();

    if (profileIdToUse === "me" && !accessToken) {
      // skip fetching profile details if user is not logged in
      return {} as GetProfileDetailsResponseDto;
    }

    const response = await axiosClient.get(`/profiles/${profileIdToUse}`, {
      headers: {
        Authorization: accessToken ? `${accessToken}` : undefined,
        "Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
        "Client-Version": process.env.NEXT_PUBLIC_CLIENT_VERSION,
        "X-Correlation-ID": correlationId,
      },
    });

    if (!response.data || !response.data.id) {
      throw new Error("Invalid data received.");
    }

    return response.data as GetProfileDetailsResponseDto;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "[getProfileDetails] Failed to fetch profile details: ",
      error
    );
    throw error; // Rethrow for other errors
  }
}
