import 'react-native-gesture-handler';
import React from 'react'
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/Navigator';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';

// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
    </Provider>
  );
}

export default App; 
