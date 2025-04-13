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
};

export default userService;
