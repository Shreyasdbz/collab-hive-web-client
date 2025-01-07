"use client";

import { v4 as uuidv4 } from "uuid";
import {
  useMutation,
  UseMutationResult,
  QueryClient,
} from "@tanstack/react-query";
import useUser from "@/providers/UserProvider";
import axiosClient from "@/lib/axios";
import { QUERY_KEY_GET_PROJECT_DETAILS } from "../queries/use-get-project-details";
import { CreateProjectLinkRequestDto } from "@/models/project-dtos";

export interface MutationArgs extends CreateProjectLinkRequestDto {
  projectId: string;
}

/**
 * Hook to create a new project in the system
 * @param onSuccessCallback: Callback function to be called on successful mutation
 * @param onErrorCallback: Callback function to be called on error
 * @returns {runMutation, mutation}
 */
export default function useAddNewProjectLink({
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
    mutationFn: (args) => addNewProjectLink(args, session?.access_token),
    onSuccess: (message) => {
      onSuccessCallback(message);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_GET_PROJECT_DETAILS],
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

async function addNewProjectLink(
  args: MutationArgs,
  accessToken: string | undefined
): Promise<string> {
  if (!accessToken) {
    throw new Error("No user session found");
  }

  try {
    const correlationId = uuidv4();
    const response = await axiosClient.post(
      `/projects/${args.projectId}/links`,
      { ...args },
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
      throw new Error("Couldn't add a new link");
    } else {
      return response.data.data.message;
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
