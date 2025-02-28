import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Import the configured Axios client
import { IPerson } from "../data/people";


export interface IPersonResponse {
  success: boolean;
  person: IPerson;
}
export interface IPeopleResponse {
  success:boolean,
  people: IPerson[];
}

export interface DeleteResponse {
  success: boolean;
}
const peopleApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: ():Promise<AxiosResponse<IPeopleResponse>> => apiClient.get(`39011e7a-b09a-429a-987e-dc4d1a89f72c`),
  fetchById: (personId:number):Promise<AxiosResponse<IPersonResponse>> => apiClient.get<IPersonResponse>(`/people/${personId}`),

  create: (data:IPerson):Promise<AxiosResponse<IPersonResponse>> => apiClient.post<IPersonResponse>("/people", data),

  update: (personId:number, data:IPerson):Promise<AxiosResponse<IPersonResponse>>  => apiClient.put<IPersonResponse>(`/people/${personId}`, data),

  delete: (personId:number):Promise<AxiosResponse<DeleteResponse>>  => apiClient.delete<DeleteResponse>(`/people/${personId}`),
};

export default peopleApi;
