import apiClient from "../context/apiConfig"; // Import the configured Axios client

const applicationTypesApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: () => apiClient.get(`b98f1c52-8a89-49ba-9756-053981c73a05`),
  fetchById: (applicationTypeId) =>
    apiClient.get(`/applicationtype/${applicationTypeId}`),

  create: (data) => apiClient.post("/applicationtype", data),

  update: (applicationTypeId, data) =>
    apiClient.put(`/applicationtype/${applicationTypeId}`, data),

  delete: (applicationTypeId) =>
    apiClient.delete(`/applicationtype/${applicationTypeId}`),
};

export default applicationTypesApi;
