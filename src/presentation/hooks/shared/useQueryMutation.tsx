import { useMutation, type UseMutationOptions, type UseMutationResult } from "@tanstack/react-query";

interface Props<TData = unknown, TVariables = void, TError = unknown> {
    mutation: ( arg : TVariables) => Promise<TData>;
    success?: (data: TData) => void;
    error  ?: (error: TError, variables: TVariables, context: unknown) => void;
    options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn" | "onSuccess">;
}

const useQueryMutation = <TData = unknown, TVariables = void, TError = unknown>({
    mutation,
    success,
    error,
    options,
}: Props<TData, TVariables, TError>): UseMutationResult<TData, TError, TVariables> => {
    return useMutation<TData, TError, TVariables>({
        mutationFn: mutation,
        onSuccess : success,
        onError   : error,
        ...options,
    });
};

export default useQueryMutation;