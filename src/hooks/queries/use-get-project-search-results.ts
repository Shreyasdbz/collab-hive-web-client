import { v4 as uuidv4 } from "uuid";
import axiosClient from "@/lib/axios";
import {
  GetProjectSearchResultsRequestDto,
  GetProjectSearchResultsResponseDto,
} from "@/models/project-dtos";
import useUser from "@/providers/UserProvider";
import { useQuery } from "@tanstack/react-query";

export type QueryArgs = GetProjectSearchResultsRequestDto;

/**
 * Hook to fetch project search results
 */
export default function useGetProjectSearchResults(args: QueryArgs) {
  const { session } = useUser();

  const { data, error, isLoading } = useQuery({
    queryKey: ["project-search-results", session?.access_token],
    queryFn: () => getProjectSearchResults(args, session?.access_token),
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
}

async function getProjectSearchResults(
  args: QueryArgs,
  accessToken: string | undefined
): Promise<GetProjectSearchResultsResponseDto[]> {
  try {
    const correlationId = uuidv4();
    const response = await axiosClient.get(`/projects`, {
      params: {
        ...args,
      },
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

    return response.data as GetProjectSearchResultsResponseDto[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      console.warn(
        "[getProjectSearchResults] No data found (404). Returning an empty array."
      );
      return []; // Return an empty array for 404
    }

    console.error(
      "[getProjectSearchResults] Failed to fetch proejcts: ",
      error
    );
    throw error; // Rethrow for other errors
  }
}
