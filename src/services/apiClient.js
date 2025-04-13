import LocalStorage from '../utils/localStorage';

const { default: axios } = require('axios');

const client = axios.create({
  baseURL: 'http://10.10.103.83:8080',
});

client.interceptors.request.use(async (config) => {
  try {
    if (config.url !== '/api/auth/login') {
      const token = await LocalStorage.getData('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch (error) {
    console.log('Error in request interceptor', error);
  }
  return config;
});

const apiClient = async ({ url, method, params = null, headers = {} }) => {
  try {
    const response = await client[method](url, params, { headers });
    return response.data;
  } catch (error) {
    console.log('Error in apiClient', error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.log('token is expired');
    }
    throw error;
  }
};

export default apiClient;
