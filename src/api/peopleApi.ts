import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Import the configured Axios client
import { IPerson } from "../data/listPeople";


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
  fetchAll: ():Promise<AxiosResponse<IPeopleResponse>> => apiClient.get(`05ebf1f3-9439-41f6-aa8c-c12858f86e31`),
  fetchById: (personId:number):Promise<AxiosResponse<IPersonResponse>> => apiClient.get<IPersonResponse>(`/people/${personId}`),

  create: (data:IPerson):Promise<AxiosResponse<IPersonResponse>> => apiClient.post<IPersonResponse>("/people", data),

  update: (personId:number, data:IPerson):Promise<AxiosResponse<IPersonResponse>>  => apiClient.put<IPersonResponse>(`/people/${personId}`, data),

  delete: (personId:number):Promise<AxiosResponse<DeleteResponse>>  => apiClient.delete<DeleteResponse>(`/people/${personId}`),
};

export default peopleApi;
