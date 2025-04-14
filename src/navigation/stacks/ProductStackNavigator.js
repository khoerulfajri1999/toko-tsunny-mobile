import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import ProductScreen from '../../screens/product/ProductScreen';
import ProductDetailScreen from '../../screens/product/product-detail/ProductDetailScreen';
import EditProductScreen from '../../screens/product/product-detail/edit-product/EditProductScreen';
import ProductFormScreen from '../../screens/product/products/create-product/ProductFormScreen';

const Stack = createNativeStackNavigator();

const ProductStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.PRODUCT} component={ProductScreen} />
      <Stack.Screen
        name={SCREEN_PATH.PRODUCT_DETAIL}
        component={ProductDetailScreen}
      />
      <Stack.Screen
        name={SCREEN_PATH.EDIT_PRODUCT}
        component={EditProductScreen}
      />
      <Stack.Screen
        name={SCREEN_PATH.ADD_PRODUCT}
        component={ProductFormScreen}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
