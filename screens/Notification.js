import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import ScreenHeader from '../components/Header';

export default class NotificationScreen extends React.Component{
    render(){
        return(
            <View>
                <ScreenHeader title = "Notifications"/>
                <Text>Notification screen</Text>
            </View>
        )}
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})