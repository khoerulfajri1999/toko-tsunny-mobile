import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { TAB_PATH } from './PathNavigator';
import DashboardStackNavigator from './stacks/DashboardStackNavigator';
import ProductStackNavigator from './stacks/ProductStackNavigator';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';
import TransactionStackNavigator from './stacks/TransactionStackNavigator';
import HomeStackNavigator from './stacks/HomeStackNavigator';
import { useEffect, useState } from 'react';
import authService from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // local loading

  const fetchUser = async () => {
    setIsLoading(true);
    try {
      const response = await authService.getCurrentUser();
      const decoded = jwtDecode(response);
      setRole(decoded.role);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ⏳ Tampilkan loading spinner kalau masih fetching role
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF8C00" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === TAB_PATH.DASHBOARD) iconName = 'home';
          else if (route.name === TAB_PATH.PRODUCT) iconName = 'inventory';
          else if (route.name === TAB_PATH.HOME) iconName = 'inventory';
          else if (route.name === TAB_PATH.TRANSACTION)
            iconName = 'receipt-long';
          else if (route.name === TAB_PATH.PROFILE) iconName = 'account-circle';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF8C00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {role === 'admin' && (
        <>
          <Tab.Screen
            name={TAB_PATH.DASHBOARD}
            component={DashboardStackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name={TAB_PATH.PRODUCT}
            component={ProductStackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name={TAB_PATH.TRANSACTION}
            component={TransactionStackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name={TAB_PATH.PROFILE}
            component={ProfileStackNavigator}
            options={{ headerShown: false }}
          />
        </>
      )}
      {role === 'user' && (
        <>
          <Tab.Screen
            name={TAB_PATH.HOME}
            component={HomeStackNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name={TAB_PATH.PROFILE}
            component={ProfileStackNavigator}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabNavigator;
