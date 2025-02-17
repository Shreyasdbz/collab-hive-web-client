import { v4 as uuidv4 } from "uuid";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import useUser from "@/providers/UserProvider";
import axiosClient from "@/lib/axios";

export type MutationArgs = {
  projectId: string;
};

/**
 * Hook to delete project
 * @param onSuccessCallback: Callback function to be called on successful mutation
 * @param onErrorCallback: Callback function to be called on error
 * @returns {runMutation, mutation}
 */
export default function useDeleteProject({
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

  const mutation = useMutation<string, unknown, MutationArgs>({
    mutationFn: (args) => deleteProject(args, session?.access_token),
    onSuccess: (message) => {
      onSuccessCallback(message);
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

async function deleteProject(
  args: MutationArgs,
  accessToken: string | undefined
): Promise<string> {
  if (!accessToken) {
    throw new Error("No user session found");
  }

  try {
    const correlationId = uuidv4();
    const response = await axiosClient.delete(`/projects/${args.projectId}`, {
      headers: {
        Authorization: `${accessToken}`,
        "Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
        "Client-Version": process.env.NEXT_PUBLIC_CLIENT_VERSION,
        "X-Correlation-ID": correlationId,
      },
    });

    if (response.status !== 204) {
      throw new Error("Project deleting failed");
    } else {
      return "Project deleted";
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // No response (network issue, etc.)
    throw new Error(error.message || "Network Error");
  }
}
