import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_PATH } from '../PathNavigator';
import DashboardScreen from '../../screens/dashboard/DashboardScreen';
import ArticleDetailScreen from '../../screens/dashboard/article-detail/ArticleDetailScreen';

const Stack = createNativeStackNavigator();

const DashboardStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN_PATH.DASHBOARD} component={DashboardScreen} />
      <Stack.Screen name={SCREEN_PATH.ARTICLE_DETAIL} component={ArticleDetailScreen} />
    </Stack.Navigator>
  );
};

export default DashboardStackNavigator;
