import axios from 'axios';

// -------------------------------------------------------
// Axios instance pre-configured for the EcoTrack backend.
// Update BASE_URL once the backend API is deployed.
// -------------------------------------------------------

const BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// --- Request interceptor (e.g. attach auth token) ---
api.interceptors.request.use(
    (config) => {
        // TODO: Retrieve token from secure storage and attach it
        // const token = await SecureStore.getItemAsync('authToken');
        // if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error),
);

// --- Response interceptor (e.g. global error handling) ---
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // TODO: Handle 401 / token refresh logic here
        return Promise.reject(error);
    },
);

export default api;
