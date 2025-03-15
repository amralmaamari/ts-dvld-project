import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Import the configured Axios client
import { IListLocalDrivingLicenseApplications } from "../data/listLocalDrivingLicenseApplications";
//the create and update and delete change it to fit the requiremt

// Response when fetching a single 
export interface ILocalDrivingLicenseApplicationResponse {
  success: boolean;
  allLocalDrivingLicenseApplications: IListLocalDrivingLicenseApplications;
}

// Response when fetching multiple 
export interface ILocalDrivingLicenseApplicationResponses {
  success: boolean;
  allLocalDrivingLicenseApplications: IListLocalDrivingLicenseApplications[];
}

export interface IDeleteResponse {
  success: boolean;
}
const localDrivingLicenseApplicationsApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: () => apiClient.get(`a455948d-0249-4c60-978b-ae9ada64533b`),
  fetchById: (personId:number): Promise<AxiosResponse<ILocalDrivingLicenseApplicationResponse>> => apiClient.get<ILocalDrivingLicenseApplicationResponse>(`/local-application/${personId}`),

  create: (data:ILocalDrivingLicenseApplicationResponse): Promise<AxiosResponse<ILocalDrivingLicenseApplicationResponse>> => apiClient.post<ILocalDrivingLicenseApplicationResponse>("/local-application", data),

  update: (personId:number, data:ILocalDrivingLicenseApplicationResponse):Promise<AxiosResponse<ILocalDrivingLicenseApplicationResponse>> => apiClient.put<ILocalDrivingLicenseApplicationResponse>(`/local-application/${personId}`, data),

  delete: (personId:number):Promise<AxiosResponse<IDeleteResponse>> => apiClient.delete<IDeleteResponse>(`/local-application/${personId}`),
};

export default localDrivingLicenseApplicationsApi;
