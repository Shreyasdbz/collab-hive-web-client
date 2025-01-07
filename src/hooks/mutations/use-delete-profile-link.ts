import { v4 as uuidv4 } from "uuid";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import useUser from "@/providers/UserProvider";
import axiosClient from "@/lib/axios";

export type MutationArgs = {
  linkId: string;
};

/**
 * Hook to delete a link associated with a profile
 * @param onSuccessCallback: Callback function to be called on successful mutation
 * @param onErrorCallback: Callback function to be called on error
 * @returns {runMutation, mutation}
 */
export default function useDeleteProfileLink({
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
    mutationFn: (args) => deleteProfileLink(args, session?.access_token),
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

async function deleteProfileLink(
  args: MutationArgs,
  accessToken: string | undefined
): Promise<string> {
  if (!accessToken) {
    throw new Error("No user session found");
  }

  try {
    const correlationId = uuidv4();
    const response = await axiosClient.delete(
      `/profiles/links/${args.linkId}`,
      {
        headers: {
          Authorization: `${accessToken}`,
          "Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
          "Client-Version": process.env.NEXT_PUBLIC_CLIENT_VERSION,
          "X-Correlation-ID": correlationId,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Profile link deleting failed");
    } else {
      return response.data.data.message;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // No response (network issue, etc.)
    throw new Error(error.message || "Network Error");
  }
}
