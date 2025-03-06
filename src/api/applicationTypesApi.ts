import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Import the configured Axios client
import { IListApplicationType } from "../data/listApplicationTypes";

// Response when fetching a single test type
export interface IApplicationTypeResponse {
  success: boolean;
  applicationType: IListApplicationType;
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
  fetchAll: () => apiClient.get(`af155916-9b5b-46c4-9363-951cd1762adb`),
  fetchById: (applicationTypeId:number): Promise<AxiosResponse<IApplicationTypeResponse>> =>
    apiClient.get<IApplicationTypeResponse>(`/applicationtype/${applicationTypeId}`),

  create: (data:IListApplicationType): Promise<AxiosResponse<IApplicationTypeResponse>> => apiClient.post<IApplicationTypeResponse>("/applicationtype", data),

  update: (applicationTypeId:number, data:IListApplicationType):Promise<AxiosResponse<IApplicationTypeResponse>> =>
    apiClient.put<IApplicationTypeResponse>(`/applicationtype/${applicationTypeId}`, data),

  delete: (applicationTypeId:number):Promise<AxiosResponse<IDeleteResponse>> =>
    apiClient.delete<IDeleteResponse>(`/applicationtype/${applicationTypeId}`),
};

export default applicationTypesApi;
