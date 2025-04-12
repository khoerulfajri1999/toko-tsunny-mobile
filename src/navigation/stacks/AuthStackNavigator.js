import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import LoginScreen from '../../screens/login/LoginScreen';
import RegisterScreen from '../../screens/register/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.LOGIN} component={LoginScreen} />
      <Stack.Screen name={SCREEN_PATH.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
