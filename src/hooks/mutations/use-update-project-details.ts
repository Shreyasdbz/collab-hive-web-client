import { v4 as uuidv4 } from "uuid";
import {
  useMutation,
  UseMutationResult,
  QueryClient,
} from "@tanstack/react-query";
import useUser from "@/providers/UserProvider";
import axiosClient from "@/lib/axios";
import { UpdateProjectDetailsRequestDto } from "@/models/project-dtos";
import { QUERY_KEY_GET_PROJECT_DETAILS } from "../queries/use-get-project-details";

export type MutationArgs = {
  projectId: string;
  updateData: UpdateProjectDetailsRequestDto;
};

/**
 * Hook to update project details
 * @param onSuccessCallback: Callback function to be called on successful mutation
 * @param onErrorCallback: Callback function to be called on error
 * @returns {runMutation, mutation}
 */
export default function useUpdateProjectDetails({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback: (message: string) => void;
  onErrorCallback: (message: string) => void;
}): {
  runMutation: (args: MutationArgs) => void;
  mutation: UseMutationResult<string, unknown, MutationArgs>;
} {
  const { session } = useUser();
  const queryClient = new QueryClient();
  const mutation = useMutation<string, unknown, MutationArgs>({
    mutationFn: (args) => updateProjectDetails(args, session?.access_token),
    onSuccess: (message) => {
      onSuccessCallback(message);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GET_PROJECT_DETAILS], // Add project ID, session token
      });
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      onErrorCallback(errorMessage);
    },
  });

  function runMutation(args: MutationArgs) {
    mutation.mutate(args);
  }

  return {
    runMutation,
    mutation,
  };
}

async function updateProjectDetails(
  args: MutationArgs,
  accessToken: string | undefined
): Promise<string> {
  if (!accessToken) {
    throw new Error("No user session found");
  }

  try {
    const correlationId = uuidv4();
    const response = await axiosClient.put(
      `/projects/${args.projectId}`,
      { ...args.updateData },
      {
        headers: {
          Authorization: `${accessToken}`,
          "Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
          "Client-Version": process.env.NEXT_PUBLIC_CLIENT_VERSION,
          "X-Correlation-ID": correlationId,
        },
      }
    );

    if (!response.data || response.data.projectId) {
      throw new Error("Project creation failed");
    } else {
      return "Project details updated successfully";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      // Response received with error status
      const { status, data } = error.response;
      if (status === 400) {
        throw new Error(data.message || "Bad Request");
      } else if (status === 401) {
        throw new Error(data.message || "Unauthorized");
      } else if (status === 500) {
        throw new Error(data.message || "Server Error");
      } else {
        throw new Error(data.message || "Unexpected Error");
      }
    } else {
      // No response (network issue, etc.)
      throw new Error(error.message || "Network Error");
    }
  }
}
