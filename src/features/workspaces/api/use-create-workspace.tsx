import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { name: string };
type ResponseType = Id<"workspaces"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
};

const useCreateWorkSpace = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setisPending] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const [isError, setisError] = useState(false);
  const [isSettled, setisSettled] = useState(false);

  const mutation = useMutation(api.workspaces.create);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        // Resetting
        setData(null);
        setError(null);
        setisError(false);
        setisSettled(false);
        setisSuccess(false);

        setisPending(true);

        const response = await mutation(values);
        options?.onSuccess?.(response);
      } catch (error) {
        options?.onError?.(error as Error);
      } finally {
        setisPending(false);
        setisSettled(true);
        options?.onSettled?.();
      }
    },
    [mutation]
  );

  return {
    mutate,
    data,
    error,
    isPending,
    isSuccess,
    isError,
    isSettled,
  };
};

export default useCreateWorkSpace;
