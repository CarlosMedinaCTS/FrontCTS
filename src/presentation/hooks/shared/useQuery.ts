import { useQuery, type QueryKey } from "@tanstack/react-query";
import type { UseQueryOptions } from "@tanstack/react-query";

/**
 * Hook reutilizable para cualquier consulta GET usando TanStack Query.
 * @param key - Clave única para el query (ej: ['usuarios'])
 * @param url - Endpoint de la API (ej: '/usuarios')a
 * @param options - Opciones adicionales de React Query
 */
function useApiQuery<T>(
  key: QueryKey,
  fn: () => Promise<T>,
  options?: Omit<UseQueryOptions<T, Error, T, QueryKey>, "queryKey" | "queryFn">
) {
  return useQuery<T, Error>({
    queryKey: key,
    queryFn: fn,
    ...options,
  });
}

export default useApiQuery;