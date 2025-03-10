import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Import the configured Axios client
import { IApplicationBasicInfo  } from "../data/applicationsInfo";

// Response when fetching a single test type
export interface IApplicationResponse {
  success: boolean;
  application: IApplicationBasicInfo ;
}

// Response when fetching multiple test types
export interface IApplicationResponses {
  success: boolean;
  applications: IApplicationBasicInfo [];
}

export interface IDeleteResponse {
  success: boolean;
}
const applicationsApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: () => apiClient.get(`b86f0447-fb27-4c03-8e65-ed71574c03f0`),
  fetchById: (applicationId:number):Promise<AxiosResponse<IApplicationResponse>>  => apiClient.get<IApplicationResponse>(`/application/${applicationId}`),

  create: (data:IApplicationBasicInfo ):Promise<AxiosResponse<IApplicationResponse>>  => apiClient.post<IApplicationResponse>("/application", data),

  update: (applicationId:number, data:IApplicationBasicInfo ):Promise<AxiosResponse<IApplicationResponse>>  =>
    apiClient.put<IApplicationResponse>(`/application/${applicationId}`, data),

  delete: (applicationId:number):Promise<AxiosResponse<IDeleteResponse>> => apiClient.delete<IDeleteResponse>(`/application/${applicationId}`),
};

export default applicationsApi;
