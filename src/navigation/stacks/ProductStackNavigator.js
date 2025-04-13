import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import ProductScreen from '../../screens/product/ProductScreen';

const Stack = createNativeStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.PRODUCT} component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
