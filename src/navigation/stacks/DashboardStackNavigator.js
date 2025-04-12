import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import DashboardScreen from '../../screens/dashboard/DashboardScreen';

const Stack = createNativeStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.DASHBOARD} component={DashboardScreen} />
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
