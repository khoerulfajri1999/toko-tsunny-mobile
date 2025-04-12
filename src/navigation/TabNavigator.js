import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { TAB_PATH } from './PathNavigator';
import DashboardStackNavigator from './stacks/DashboardStackNavigator';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === TAB_PATH.DASHBOARD) iconName = 'home';
        //   else if (route.name === TAB_PATH.ORDER) iconName = 'shopping-cart';
        //   else if (route.name === TAB_PATH.PROMO) iconName = 'local-offer';
        //   else if (route.name === TAB_PATH.PROFILE) iconName = 'person';
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
    </Tab.Navigator>
  );
};

export default TabNavigator;
