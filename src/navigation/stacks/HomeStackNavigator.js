import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import HomeScreen from '../../screens/home/HomeScreen';
import ProductDetailScreen from '../../screens/home/product-detail/ProductDetailScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.HOME} component={HomeScreen} />
      <Stack.Screen
        name={SCREEN_PATH.PRODUCT_DETAIL}
        component={ProductDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
