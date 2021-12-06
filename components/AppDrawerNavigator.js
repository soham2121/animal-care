import React from "react";
import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./BottomTabNavigator";
import SettingsScreen from "../screens/Settings";
import NotificationScreen from "../screens/Notification";
import { Icon } from 'react-native-elements';

export const AppDrawerNavigator = createDrawerNavigator({
    home: {
        screen: AppTabNavigator,
        navigationOptions: {
            drawerLabel: "Home",
            drawerIcon: <Icon name = 'home' type = 'font-awesome'/>
        }
    },
    settings: {
        screen: SettingsScreen,
        navigationOptions: {
            drawerLabel: "Settings",
            drawerIcon: <Icon name = 'cog' type = 'font-awesome'/>
        }
    },
    notif: {
        screen: NotificationScreen,
        navigationOptions: {
            drawerLabel: "Notifications",
            drawerIcon: <Icon name = 'bell' type = 'font-awesome'/>
        },
    },
},{
    initialRouteName: 'home'
})