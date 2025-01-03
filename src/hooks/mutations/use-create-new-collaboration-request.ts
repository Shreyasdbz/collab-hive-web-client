"use client";

import { v4 as uuidv4 } from "uuid";
import axiosClient from "@/lib/axios";
import useUser from "@/providers/UserProvider";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export type MutationArgs = {
  projectId: string;
  requestMessage: string;
};
export default function useCreateNewCollaborationRequest({
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
    mutationFn: (args) =>
      createNewCollaborationRequest(args, session?.access_token),
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

async function createNewCollaborationRequest(
  args: MutationArgs,
  accessToken: string | undefined
): Promise<string> {
  if (!accessToken) {
    throw new Error("No user session found");
  }

  try {
    const correlationId = uuidv4();
    const response = await axiosClient.post(
      `/collaboration/${args.projectId}`,
      { requestMessage: args.requestMessage },
      {
        headers: {
          Authorization: `${accessToken}`,
          "Client-Name": process.env.NEXT_PUBLIC_CLIENT_NAME,
          "Client-Version": process.env.NEXT_PUBLIC_CLIENT_VERSION,
          "X-Correlation-ID": correlationId,
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Collaboration request failed");
    } else {
      console.log(response.data);
      return response.data?.message || "Collaboration request successful";
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
