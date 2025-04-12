import { StatusBar } from 'react-native';
import './global.css';
import { Provider } from 'react-redux';
import { AuthProvider } from './src/context/authContext';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './src/navigation/refNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/store/store';
import Loading from './src/shared/components/loading/Loading';

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor="#FF8C00" barStyle="light-content" />
            <RootNavigator />
            <Loading />
          </SafeAreaView>
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
}
``;
