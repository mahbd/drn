import { useQuery } from "@tanstack/react-query";
import ApiClient from "@/store/apiClient";

const useModel = <T>(endpoint: string, id: string, key?: string) => {
  return useQuery<T, Error>({
    queryKey: [key || endpoint, id],
    queryFn: () => new ApiClient<T>(endpoint).getOne(id),
    staleTime: Infinity,
  });
};

export default useModel;
