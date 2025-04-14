import apiClient from './apiClient';

const productService = {
  getAllProduct: async () => {
    try {
      console.log('tes');

      const response = await apiClient({
        method: 'get',
        url: '/api/product?limit=999',
      });

      return response.data;
    } catch (error) {
      console.log('Error in getAllProduct', error);
      throw error;
    }
  },
};
export default productService;
