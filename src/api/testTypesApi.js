import apiClient from "../context/apiConfig"; // Import the configured Axios client
//the create and update and delete change it to fit the requiremt
const testTypesApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: () => apiClient.get(`017f0f97-80e3-4bb5-ba9a-0c2f211ce187`),
  // fetchById: (testTypeId) => apiClient.get(`/testType/${testTypeId}`),

  // create: (data) => apiClient.post("/testType", data),

  // update: (testTypeId, data) => apiClient.put(`/testType/${testTypeId}`, data),

  // delete: (testTypeId) => apiClient.delete(`/testType/${testTypeId}`),
};

export default testTypesApi;
