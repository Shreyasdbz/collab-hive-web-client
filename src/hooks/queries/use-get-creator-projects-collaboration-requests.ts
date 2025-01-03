"use client";

import { v4 as uuidv4 } from "uuid";
import axiosClient from "@/lib/axios";
import { GetCreatorProjectCollaborationRequestsResponseDto } from "@/models/collaboration-dtos";
import useUser from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";

export const QUERY_KEY_GET_CREATOR_PROJECTS_COLLABORATION_REQUESTS =
  "creator-projects-collaboration-requests";
/**
 * Hook to fetch collaboration requests for creator projects
 */
export default function useGetCreatorProjectsCollaborationRequests() {
  const { session } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: [
      QUERY_KEY_GET_CREATOR_PROJECTS_COLLABORATION_REQUESTS,
      session?.access_token,
    ],
    queryFn: () =>
      getCreatorProjectsCollaborationRequests(session?.access_token),
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}

/**
 * Query function to fetch collaboration requests for creator projects
 */
async function getCreatorProjectsCollaborationRequests(
  accessToken: string | undefined
): Promise<GetCreatorProjectCollaborationRequestsResponseDto[]> {
  try {
    if (!accessToken) {
      return [];
    }

    const correlationId = uuidv4();
    const response = await axiosClient.get(`/collaboration/creator-requests`, {
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

    return response.data as GetCreatorProjectCollaborationRequestsResponseDto[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(
        "[getCreatorProjectsCollaborationRequests] No data found (404). Returning an empty array."
      );
      return []; // Return an empty array for 404
    }

    console.error(
      "[getCreatorProjectsCollaborationRequests] Failed to fetch collaboration requests for creator projects:",
      error
    );
    throw error; // Rethrow for other errors
  }
}
