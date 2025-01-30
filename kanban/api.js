import axios from "axios";

const API_URL = "http://localhost:5001/api"; 


const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json'
  }
});


api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || "An error occurred. Please try again.";
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export const assignmentService = {
  fetchAssignments: async () => {
    const response = await api.get('/assignments');
    return response.data;
  },

  addAssignment: async (assignmentData) => {
    const response = await api.post('/assignments', assignmentData);
    return response.data;
  },

  updateAssignment: async (id, assignmentData) => {
    const response = await api.put(`/assignments/${id}`, assignmentData);
    return response.data;
  },

  deleteAssignment: async (id) => {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
  }
};

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/users/login', credentials);
    return response.data;
  },
  signup: async (userData) => {
    const response = await api.post('/users/signup', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const { token, user } = await authService.login({ email, password });
    localStorage.setItem('token', token);
    onLogin(user);
  } catch (error) {
    setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    console.error('Login error:', error);
  }
};

export default api;
