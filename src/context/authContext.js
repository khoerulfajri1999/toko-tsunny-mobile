import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { SCREEN_PATH } from '../navigation/PathNavigator';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { startLoading, stopLoading } from '../store/slice/appSlice';
import authService from '../services/authService';
import { navigate } from '../navigation/refNavigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();

  const checkAuth = async () => {
    dispatch(startLoading());
    try {
      const token = await authService.getCurrentUser();
      const user = jwtDecode(token);
      console.log('Usernya : ', user);

      if (user) {
        setCurrentUser(user);
      }
    } catch (error) {
      throw error;
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
      const user = jwtDecode(token);
      if (user) {
        setCurrentUser(user);
      }
      return true;
    } catch (error) {
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
      navigate(SCREEN_PATH.LOGIN);
      return true;
    } catch (error) {
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
