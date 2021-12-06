import React from 'react';
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