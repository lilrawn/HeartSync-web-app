import axios from 'axios';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

const API_URL = 'https://f65nkv-3001.csb.app'; // Replace with your actual API URL

// Auth related functions
export { auth };

export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;
  } catch (error) {
    throw new Error('Google login failed: ' + error.message);
  }
};

// Relationships related functions
export const relationships = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/relationships`);
    return response.data;
  },
  create: async (data) => {
    const response = await axios.post(`${API_URL}/relationships`, data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await axios.put(`${API_URL}/relationships/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/relationships/${id}`);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/relationships/${id}`);
    return response.data;
  }
};

// Goals related functions
export const goals = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/goals`);
    return response.data;
  },
  create: async (data) => {
    const response = await axios.post(`${API_URL}/goals`, data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await axios.put(`${API_URL}/goals/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/goals/${id}`);
    return response.data;
  }
};

// Insights related functions
export const insights = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/insights`);
    return response.data;
  }
};

// Compatibility related functions
export const compatibility = {
  test: async (data) => {
    const response = await axios.post(`${API_URL}/compatibility/test`, data);
    return response.data;
  }
};

// Profile related functions
export const profile = {
  get: async () => {
    const response = await axios.get(`${API_URL}/profile`);
    return response.data;
  },
  update: async (data) => {
    const response = await axios.put(`${API_URL}/profile`, data);
    return response.data;
  }
};

// Reports related functions
export const reports = {
  getAll: async () => {
    const response = await axios.get(`${API_URL}/reports`);
    return response.data;
  },
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/reports/${id}`);
    return response.data;
  }
};

// Default export for backward compatibility
const api = {
  relationships,
  goals,
  insights,
  compatibility,
  profile,
  reports,
  googleLogin
};

export default api;