import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Configured Axios client
import { ITestTypeRow } from "../data/testTypes";

// Response when fetching a single test type
export interface ITestTypeResponse {
  success: boolean;
  testType: ITestTypeRow;
}

// Response when fetching multiple test types
export interface ITestTypeResponses {
  success: boolean;
  testTypes: ITestTypeRow[];
}

export interface IDeleteResponse {
  success: boolean;
}

const testTypeApi = {
  // Fetch all test types (using a mock endpoint or actual URL)
  fetchAll: (): Promise<AxiosResponse<ITestTypeResponses>> =>
    apiClient.get(`8025c575-1390-4884-be6e-3e9e517af509`),

  // Fetch a test type by ID
  fetchById: (testTypeId: number): Promise<AxiosResponse<ITestTypeResponse>> =>
    apiClient.get<ITestTypeResponse>(`/testType/${testTypeId}`),

  // Create a new test type
  create: (data: ITestTypeRow): Promise<AxiosResponse<ITestTypeResponse>> =>
    apiClient.post<ITestTypeResponse>("/testType", data),

  // Update an existing test type by ID
  update: (
    testTypeId: number,
    data: ITestTypeRow
  ): Promise<AxiosResponse<ITestTypeResponse>> =>
    apiClient.put<ITestTypeResponse>(`/testType/${testTypeId}`, data),

  // Delete a test type by ID
  delete: (testTypeId: number): Promise<AxiosResponse<IDeleteResponse>> =>
    apiClient.delete<IDeleteResponse>(`/testType/${testTypeId}`),
};

export default testTypeApi;
