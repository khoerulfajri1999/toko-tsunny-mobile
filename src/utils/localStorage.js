import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalStorage = {
  setData: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      throw new Error('Error set data to local storage ', error);
    }
  },

  getData: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value) return value;
    } catch (error) {
      throw new Error('Error get data from local storage ', error);
    }
  },

  removeData: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      throw new Error('Error remove data from local storage ', error);
    }
  },
};

export default LocalStorage;
