import { v4 as uuidv4 } from "uuid";
import { UpdateProfileDetailsRequestDto } from "@/models/profile-dtos";
import useUser from "@/providers/UserProvider";
import axiosClient from "@/lib/axios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export type MutationArgs = {
  data: UpdateProfileDetailsRequestDto;
};

export default function useUpdateProfileDetails({
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
    mutationFn: (args) => updateProfileDetails(args, session?.access_token),
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

async function updateProfileDetails(
  args: MutationArgs,
  accessToken: string | undefined
): Promise<string> {
  if (!accessToken) {
    throw new Error("No user session found");
  }

  try {
    const correlationId = uuidv4();
    const response = await axiosClient.put(
      `/profiles`,
      { ...args.data },
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
      throw new Error("Profile update failed");
    } else {
      return "Profile updated successfully";
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
