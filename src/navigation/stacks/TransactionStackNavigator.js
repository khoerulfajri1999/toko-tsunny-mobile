import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import TransactionScreen from '../../screens/transaction/TransactionScreen';
import TransactionSummaryScreen from '../../screens/transaction/TransactionSummaryScreen';

const Stack = createNativeStackNavigator();

const TransactionStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={SCREEN_PATH.TRANSACTION}
        component={TransactionScreen}
      />
      <Stack.Screen
        name={SCREEN_PATH.TRANSACTION_SUMMARY}
        component={TransactionSummaryScreen}
      />
    </Stack.Navigator>
  );
};

export default TransactionStackNavigator;
