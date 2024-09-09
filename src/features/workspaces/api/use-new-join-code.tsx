import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useMemo, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { workspaceId: Id<"workspaces">};
type ResponseType = Id<"workspaces"> | null;

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
};

const useNewJoinCode = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);
  const [status, setStatus] = useState<
    "success" | "error" | "settled" | "pending" | null
  >(null);
  //   const [isPending, setisPending] = useState(false);
  //   const [isSuccess, setisSuccess] = useState(false);
  //   const [isError, setisError] = useState(false);
  //   const [isSettled, setisSettled] = useState(false);

  const isPending = useMemo(() => status === "pending", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);

  const mutation = useMutation(api.workspaces.newJoinCode);

  const mutate = useCallback(
    async (values: RequestType, options?: Options) => {
      try {
        // Resetting
        setData(null);
        setError(null);
        setStatus("pending");

        const response = await mutation(values);
        options?.onSuccess?.(response);
      } catch (error) {
        setStatus("error");
        options?.onError?.(error as Error);
      } finally {
        setStatus("settled");
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
    isError,
    isSettled,
    isSuccess,
  };
};

export default useNewJoinCode;
