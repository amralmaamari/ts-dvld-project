import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Import the configured Axios client
import { IApplicationType } from "../data/applicationTypes";

// Response when fetching a single test type
export interface IApplicationTypeResponse {
  success: boolean;
  applicationType: IApplicationType;
}

// Response when fetching multiple test types
export interface IApplicationTypeResponses {
  success: boolean;
  applicationTypes: IApplicationTypeResponse[];
}

export interface IDeleteResponse {
  success: boolean;
}
const applicationTypesApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: () => apiClient.get(`52c046f2-59a9-48d4-8804-f01e810d7233`),
  fetchById: (applicationTypeId:number): Promise<AxiosResponse<IApplicationTypeResponse>> =>
    apiClient.get<IApplicationTypeResponse>(`/applicationtype/${applicationTypeId}`),

  create: (data:IApplicationType): Promise<AxiosResponse<IApplicationTypeResponse>> => apiClient.post<IApplicationTypeResponse>("/applicationtype", data),

  update: (applicationTypeId:number, data:IApplicationType):Promise<AxiosResponse<IApplicationTypeResponse>> =>
    apiClient.put<IApplicationTypeResponse>(`/applicationtype/${applicationTypeId}`, data),

  delete: (applicationTypeId:number):Promise<AxiosResponse<IDeleteResponse>> =>
    apiClient.delete<IDeleteResponse>(`/applicationtype/${applicationTypeId}`),
};

export default applicationTypesApi;
