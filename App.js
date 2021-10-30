import React from 'react';
import { StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default function App() {
  return (
    <AppContainer/>
  );
}

const switchnavigator = createSwitchNavigator({
  login: {screen: LoginScreen},
  drawer: {screen: AppDrawerNavigator}
},{
  initialRouteName: 'login'
});

const AppContainer = createAppContainer(switchnavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
