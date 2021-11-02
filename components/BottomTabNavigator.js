import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import EditScreen from '../screens/EditScreen';
import { Image } from 'react-native';

export const AppTabNavigator = createBottomTabNavigator({
    view: {
        screen: HomeScreen,
        navigationOptions :{
            tabBarIcon: <Image source={require("../assets/view.png")} style={{width: 40, height: 20}}/>,
            tabBarLabel: "View"
        }
    },
    edit: {
        screen: EditScreen,
        navigationOptions :{
            tabBarIcon: <Image source={require("../assets/edit.png")} style={{width: 20, height: 20}}/>,
            tabBarLabel: "Edit",
        }
    }
},
{
    initialRouteName: "view"
})