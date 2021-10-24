import { createDrawerNavigator } from "react-navigation-drawer";
import { AppTabNavigator } from "./BottomTabNavigator";
import SettingsScreen from "../screens/Settings";
import NotificationScreen from "../screens/Notification";

export const AppDrawerNavigator = createDrawerNavigator({
    home: {screen: AppTabNavigator},
    settings: {screen: SettingsScreen},
    notif: {screen: NotificationScreen}
},{
    initialRouteName: "home"
})