"use client";

import { v4 as uuidv4 } from "uuid";
import axiosClient from "@/lib/axios";
import { GetCollaboratorProjectCardResponseDto } from "@/models/collaboration-dtos";
import useUser from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch collaborator-role project cards for dashboard
 */
export default function useGetCollaboratorProjectCards() {
  const { session } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: ["dashboard-collaborator-project-cards", session?.access_token],
    queryFn: () => getCollaboratorProjectCards(session?.access_token),
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}

/**
 * Query function to fetch collaborator-role project cards for dashboard
 */
async function getCollaboratorProjectCards(
  accessToken: string | undefined
): Promise<GetCollaboratorProjectCardResponseDto[]> {
  try {
    if (!accessToken) {
      return [];
    }

    const correlationId = uuidv4();
    const response = await axiosClient.get(
      `/collaboration/collaborator-projects`,
      {
        headers: {
          Authorization: accessToken ? `${accessToken}` : undefined,
          "Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
          "Client-Version": process.env.NEXT_PUBLIC_CLIENT_VERSION,
          "X-Correlation-ID": correlationId,
        },
      }
    );

    if (!response.data) {
      throw new Error("Invalid data received.");
    }

    return response.data as GetCollaboratorProjectCardResponseDto[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(
        "[getDashboardProjectCollaboratorCards] No data found (404). Returning an empty array."
      );
      return []; // Return an empty array for 404
    }

    console.error(
      "[getDashboardProjectCollaboratorCards] Failed to fetch project collaborator cards for dashboard:",
      error
    );
    throw error; // Rethrow for other errors
  }
}
