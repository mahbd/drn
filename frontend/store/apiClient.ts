import httpService from "@/store/http";
import { APIEndpoint } from "@/store/config";

const axiosInstance = httpService.create({
  baseURL: APIEndpoint,
});

class ApiClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () => {
    return axiosInstance.get<T[]>(this.endpoint).then((res) => res.data);
  };

  getOne = (id: string) => {
    return axiosInstance
      .get<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };

  create = (data: T) => {
    return axiosInstance.post<T>(this.endpoint, data).then((res) => res.data);
  };

  update = (id: string, data: T) => {
    return axiosInstance
      .put<T>(`${this.endpoint}/${id}`, data)
      .then((res) => res.data);
  };

  delete = (id: string) => {
    return axiosInstance
      .delete<T>(`${this.endpoint}/${id}`)
      .then((res) => res.data);
  };
}

export default ApiClient;
