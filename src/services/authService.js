import LocalStorage from '../utils/localStorage';
import apiClient from './apiClient';

const authService = {
  login: async (email, password) => {
    try {
      const response = await apiClient({
        method: 'post',
        url: '/api/auth/login',
        params: { email, password },
      });
      if (response.data.token) {
        await LocalStorage.setData('token', response.data.token);
        
        return response.data.token;
      }
    } catch (error) {
      console.log('Error in login', error);
      throw error;
    }
  },

  // register: async (newUser) => {
  //   await new Promise((resolve) => setTimeout(resolve, 500));

  //   const createdUser = { id: users.length + 1, ...newUser };
  //   users.push(User.fromJson(createdUser));
  //   return createdUser;
  // },

  logout: async () => {
    await LocalStorage.removeData('token');
  },

  getCurrentUser: async () => {
    return await LocalStorage.getData('token');
  },
};

export default authService;
