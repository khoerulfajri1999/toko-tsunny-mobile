import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import LoginScreen from '../../screens/login/LoginScreen';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={SCREEN_PATH.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
