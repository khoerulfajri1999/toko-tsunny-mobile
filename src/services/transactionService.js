import apiClient from './apiClient';

const transactionService = {
  createTransaction: async (formData) => {
    try {
      const response = await apiClient({
        method: 'post',
        url: '/api/transaction',
        params: formData,
      });
      return response.data;
    } catch (error) {
      console.log('Error in create transaction:', error);
      throw error;
    }
  },
};
export default transactionService;
