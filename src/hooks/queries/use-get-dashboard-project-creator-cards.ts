"use client";

import { v4 as uuidv4 } from "uuid";
import axiosClient from "@/lib/axios";
import { GetCreatorProjectCardResponseDto } from "@/models/collaboration-dtos";
import useUser from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEY_GET_CREATOR_PROJECT_CARDS =
  "dashboard-creator-project-cards";

/**
 * Hook to fetch creator-role project cards for dashboard
 */
export default function useGetCreatorProjectCards() {
  const { session } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: [QUERY_KEY_GET_CREATOR_PROJECT_CARDS, session?.access_token],
    queryFn: () => getCreatorProjectCards(session?.access_token),
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}

/**
 * Query function to fetch creator-role project cards for dashboard
 */
async function getCreatorProjectCards(
  accessToken: string | undefined
): Promise<GetCreatorProjectCardResponseDto[]> {
  try {
    if (!accessToken) {
      return [];
    }

    const correlationId = uuidv4();
    const response = await axiosClient.get(`/collaboration/creator-projects`, {
      headers: {
        Authorization: accessToken ? `${accessToken}` : undefined,
        "Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
        "Client-Version": process.env.NEXT_PUBLIC_CLIENT_VERSION,
        "X-Correlation-ID": correlationId,
      },
    });

    if (!response.data) {
      throw new Error("Invalid data received.");
    }

    return response.data as GetCreatorProjectCardResponseDto[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(
        "[getDashboardProjectCreatorCards] No data found (404). Returning an empty array."
      );
      return []; // Return an empty array for 404
    }

    console.error(
      "[getDashboardProjectCreatorCards] Failed to fetch project creator cards for dashboard:",
      error
    );
    throw error; // Rethrow for other errors
  }
}
