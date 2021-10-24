import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ScreenHeader from '../components/Header';

export default class EditScreen extends React.Component{
    render(){
        return(
            <View>
                <ScreenHeader title = "Edit Screen"/>
                <Text>Edit screen</Text>
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