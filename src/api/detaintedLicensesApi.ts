import { AxiosResponse } from "axios";
import { IDetainedLicenses } from "../data/listDetainedLicenses";
import apiClient from "../context/apiConfig";

export interface IDetaintedLicensesResponse {
  success: boolean;
  detainedLicenses: IDetainedLicenses;
}
export interface IDetaintedLicensesResponses {
  success:boolean,
  detainedLicenses: IDetainedLicenses[];
}

export interface DeleteResponse {
  success: boolean;
}
const detainedLicensesApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: ():Promise<AxiosResponse<IDetaintedLicensesResponses>> => apiClient.get(`4464c248-89fe-4e02-8073-73473fdff76a`),
  fetchById: (detainId:number):Promise<AxiosResponse<IDetaintedLicensesResponse>> => apiClient.get<IDetaintedLicensesResponse>(`/detained-licenses/${detainId}`),

  create: (data:IDetainedLicenses):Promise<AxiosResponse<IDetaintedLicensesResponse>> => apiClient.post<IDetaintedLicensesResponse>("/detained-licenses", data),

  update: (detainId:number, data:IDetainedLicenses):Promise<AxiosResponse<IDetaintedLicensesResponse>>  => apiClient.put<IDetaintedLicensesResponse>(`/detained-licenses/${detainId}`, data),

  delete: (detainId:number):Promise<AxiosResponse<DeleteResponse>>  => apiClient.delete<DeleteResponse>(`/detained-licenses/${detainId}`),
};

export default detainedLicensesApi;