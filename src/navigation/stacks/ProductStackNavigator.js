import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import ProductScreen from '../../screens/product/ProductScreen';
import ProductDetailScreen from '../../screens/product/product-detail/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.PRODUCT} component={ProductScreen} />
      <Stack.Screen name={SCREEN_PATH.PRODUCT_DETAIL} component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
