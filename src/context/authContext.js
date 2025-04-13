import { createContext, useContext, useEffect, useState } from 'react';
import { SCREEN_PATH } from '../navigation/PathNavigator';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/slice/appSlice';
import { setUser, clearUser } from '../store/slice/userSlice'; // 🆕 import action user
import authService from '../services/authService';
import userService from '../services/userService'; // 🆕 import
import { navigate } from '../navigation/refNavigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  const checkAuth = async () => {
    dispatch(startLoading());
    try {
      const token = await authService.getCurrentUser();
      if (token) {
        const profile = await userService.me();
        dispatch(setUser(profile)); 
        setCurrentUser(profile);
      }
    } catch (error) {
      console.log('checkAuth error:', error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    dispatch(startLoading());
    try {
      const token = await authService.login(email, password);
      if (token) {
        const profile = await userService.me(); // 🆕 ambil data dari backend
        dispatch(setUser(profile)); // 🆕 simpan ke redux
        setCurrentUser(profile);
      }
      return true;
    } catch (error) {
      console.log('login error:', error);
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  };

  const logout = async () => {
    dispatch(startLoading());
    try {
      await authService.logout();
      setCurrentUser(null);
      dispatch(clearUser()); // 🆕 bersihkan user dari redux
      navigate(SCREEN_PATH.LOGIN);
      return true;
    } catch (error) {
      console.log('logout error:', error);
      throw error;
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
