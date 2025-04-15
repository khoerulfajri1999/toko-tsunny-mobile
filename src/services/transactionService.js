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
  getTransactionById: async (id) => {
    try {
      const response = await apiClient({
        method: 'get',
        url: `/api/transaction/${id}`,
      });
      return response.data;
    } catch (error) {
      console.log('Error in create transaction:', error);
      throw error;
    }
  },
};
export default transactionService;
