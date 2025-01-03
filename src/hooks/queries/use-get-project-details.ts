import { v4 as uuidv4 } from "uuid";
import axiosClient from "@/lib/axios";
import { GetProjectDetailsResponseDto } from "@/models/project-dtos";
import useUser from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";

export type QueryArgs = {
  projectId: string;
};

export const QUERY_KEY_GET_PROJECT_DETAILS = "project-details";

/**
 * Hook to fetch project details
 */
export default function useGetProjectDetails(args: QueryArgs) {
  const { session } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: [
      QUERY_KEY_GET_PROJECT_DETAILS,
      args.projectId,
      session?.access_token,
    ],
    queryFn: () => getProjectDetails(args, session?.access_token),
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}

async function getProjectDetails(
  args: QueryArgs,
  accessToken: string | undefined
): Promise<GetProjectDetailsResponseDto> {
  try {
    const correlationId = uuidv4();
    const response = await axiosClient.get(`/projects/${args.projectId}`, {
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

    return response.data as GetProjectDetailsResponseDto;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "[getProjectDetails] Failed to fetch project details: ",
      error
    );
    throw error; // Rethrow for other errors
  }
}
