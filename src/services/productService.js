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
  getProductById: async (id) => {
    try {
      const response = await apiClient({
        method: 'get',
        url: `/api/product/${id}`,
      });

      return response.data;
    } catch (error) {
      console.log('Error in Product get by id', error);
      throw error;
    }
  },
  updateProduct: async (productId, formData) => {
    try {
      const response = await apiClient({
        method: 'put',
        url: `/api/product/${productId}`,
        params: formData,
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
export default productService;
