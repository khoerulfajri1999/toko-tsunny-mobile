import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import TransactionScreen from '../../screens/transaction/TransactionScreen';

const Stack = createNativeStackNavigator();

const TransactionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.TRANSACTION} component={TransactionScreen} />
    </Stack.Navigator>
  );
};

export default TransactionStackNavigator;
