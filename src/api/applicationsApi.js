import apiClient from "../context/apiConfig"; // Import the configured Axios client

const applicationsApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: () => apiClient.get(`b86f0447-fb27-4c03-8e65-ed71574c03f0`),
  fetchById: (applicationId) => apiClient.get(`/application/${applicationId}`),

  create: (data) => apiClient.post("/application", data),

  update: (applicationId, data) =>
    apiClient.put(`/application/${applicationId}`, data),

  delete: (applicationId) => apiClient.delete(`/application/${applicationId}`),
};

export default applicationsApi;
