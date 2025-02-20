import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL as string;

// ✅ Base API Config
const apiClient = axios.create({
  baseURL: backendUrl, // Set your base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Auto Attach Token (if needed)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Get token if exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
