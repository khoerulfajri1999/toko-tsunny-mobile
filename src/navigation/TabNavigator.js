import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { TAB_PATH } from './PathNavigator';
import DashboardStackNavigator from './stacks/DashboardStackNavigator';
import ProductStackNavigator from './stacks/ProductStackNavigator';
import ProfileStackNavigator from './stacks/ProfileStackNavigator';
import TransactionStackNavigator from './stacks/TransactionStackNavigator';
import HomeStackNavigator from './stacks/HomeStackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
      <Tab.Screen
        name={TAB_PATH.DASHBOARD}
        component={DashboardStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={TAB_PATH.HOME}
        component={HomeStackNavigator}
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
    </Tab.Navigator>
  );
};

export default TabNavigator;
