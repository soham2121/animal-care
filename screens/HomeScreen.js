import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenHeader from '../components/Header';
import firebase from 'firebase';
import db from '../config';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class HomeScreen extends React.Component{
    constructor(){
        super();
    }

    render(){
        return(
            <SafeAreaProvider>
            <View>
                <ScreenHeader title = "Home Screen"/>
                <Text>Home Screen</Text>
            </View>
            </SafeAreaProvider>
        )}
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})