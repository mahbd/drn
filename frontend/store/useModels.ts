import { useQuery } from "@tanstack/react-query";
import ApiClient from "@/store/apiClient";

const useModels = <T>(endpoint: string, key?: string) => {
  return useQuery<T[], Error>({
    queryKey: [key || endpoint],
    queryFn: new ApiClient<T>(endpoint).getAll,
    staleTime: Infinity,
  });
};

export default useModels;
