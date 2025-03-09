import { AxiosResponse } from "axios";
import apiClient from "../context/apiConfig"; // Configured Axios client
import { IUsers } from "../data/listUsers";

// Response when fetching a single test type
export interface IUsersResponse {
  success: boolean;
  users: IUsers;
}

// Response when fetching multiple test types
export interface IUsersResponses {
  success: boolean;
  users: IUsers[];
}

export interface IDeleteResponse {
  success: boolean;
}

const usersApi = {
  // Fetch all test types (using a mock endpoint or actual URL)
  fetchAll: (): Promise<AxiosResponse<IUsersResponses>> =>
    apiClient.get(`39a7870a-db80-48dc-9af4-c6ae496d2511`),

  // Fetch a test type by ID
  fetchById: (testTypeId: number): Promise<AxiosResponse<IUsersResponse>> =>
    apiClient.get<IUsersResponse>(`/testType/${testTypeId}`),

  // Create a new test type
  create: (data: IUsers): Promise<AxiosResponse<IUsersResponse>> =>
    apiClient.post<IUsersResponse>("/testType", data),

  // Update an existing test type by ID
  update: (
    testTypeId: number,
    data: IUsers
  ): Promise<AxiosResponse<IUsersResponse>> =>
    apiClient.put<IUsersResponse>(`/testType/${testTypeId}`, data),

  // Delete a test type by ID
  delete: (testTypeId: number): Promise<AxiosResponse<IDeleteResponse>> =>
    apiClient.delete<IDeleteResponse>(`/testType/${testTypeId}`),
};

export default usersApi;
