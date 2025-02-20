import apiClient from "../context/apiConfig"; // Import the configured Axios client
//the create and update and delete change it to fit the requiremt
const localApi = {
  //   fetchAll: (page, pageSize) =>
  //     apiClient.get(`/?page=${page}&results=${pageSize}`),
  fetchAll: () => apiClient.get(`719d259f-8b04-4637-affc-c5c45997a5cd`),
  fetchById: (personId) => apiClient.get(`/people/${personId}`),

  create: (data) => apiClient.post("/people", data),

  update: (personId, data) => apiClient.put(`/people/${personId}`, data),

  delete: (personId) => apiClient.delete(`/people/${personId}`),
};

export default localApi;
