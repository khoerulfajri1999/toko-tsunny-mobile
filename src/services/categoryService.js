import apiClient from './apiClient';

const categoryService = {
  createCategory: async (name) => {
    try {
      const response = await apiClient({
        method: 'post',
        url: '/api/category',
        params: { name },
      });
      return response.data;
    } catch (error) {
      console.log('Error create category', error);
      throw error;
    }
  },
  getAllCategories: async () => {
    try {
      const response = await apiClient({
        method: 'get',
        url: '/api/category',
      });

      return response.data;
    } catch (error) {
      console.log('Error in getAllProduct', error);
      throw error;
    }
  },
};
export default categoryService;
