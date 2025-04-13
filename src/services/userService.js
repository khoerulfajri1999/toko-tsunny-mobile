import LocalStorage from '../utils/localStorage';
import apiClient from './apiClient';

const userService = {
  me: async () => {
    try {
      const response = await apiClient({
        method: 'get',
        url: '/api/user/me',
      });
      return response.data;
    } catch (error) {
      console.log('Error in login', error);
      throw error;
    }
  },
  updateUser: async (userId, formData) => {
    try {
      const response = await apiClient({
        method: 'put',
        url: `/api/user/${userId}`,
        params: formData, // tetap pakai 'params'
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.log('Error in updating profile:', error);
      throw error;
    }
  },
};

export default userService;
