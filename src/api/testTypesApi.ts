import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Configured Axios client
import { IListTestTypeRow } from "../data/listTestTypes";

// Response when fetching a single test type
export interface ITestTypeResponse {
  success: boolean;
  testType: IListTestTypeRow;
}

// Response when fetching multiple test types
export interface ITestTypeResponses {
  success: boolean;
  testTypes: IListTestTypeRow[];
}

export interface IDeleteResponse {
  success: boolean;
}

const testTypeApi = {
  // Fetch all test types (using a mock endpoint or actual URL)
  fetchAll: (): Promise<AxiosResponse<ITestTypeResponses>> =>
    apiClient.get(`ae5ee35b-3217-48b4-9e5c-1f1bbbc7bf5b`),

  // Fetch a test type by ID
  fetchById: (testTypeId: number): Promise<AxiosResponse<ITestTypeResponse>> =>
    apiClient.get<ITestTypeResponse>(`/testType/${testTypeId}`),

  // Create a new test type
  create: (data: IListTestTypeRow): Promise<AxiosResponse<ITestTypeResponse>> =>
    apiClient.post<ITestTypeResponse>("/testType", data),

  // Update an existing test type by ID
  update: (
    testTypeId: number,
    data: IListTestTypeRow
  ): Promise<AxiosResponse<ITestTypeResponse>> =>
    apiClient.put<ITestTypeResponse>(`/testType/${testTypeId}`, data),

  // Delete a test type by ID
  delete: (testTypeId: number): Promise<AxiosResponse<IDeleteResponse>> =>
    apiClient.delete<IDeleteResponse>(`/testType/${testTypeId}`),
};

export default testTypeApi;
