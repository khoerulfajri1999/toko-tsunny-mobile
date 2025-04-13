import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import LoginScreen from '../../screens/login/LoginScreen';
import ChangeProfileScreen from '../../screens/profile/change-profile/ChangeProfileScreen';
import OnFixingScreen from '../../screens/commons/OnFixingScreen';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.PROFILE} component={ProfileScreen} />
      <Stack.Screen name={SCREEN_PATH.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={SCREEN_PATH.CHANGE_PROFILE}
        component={ChangeProfileScreen}
      />
      <Stack.Screen
        name={SCREEN_PATH.CHANGE_PASSWORD}
        component={OnFixingScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
