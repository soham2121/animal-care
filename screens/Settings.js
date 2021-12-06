import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import ScreenHeader from '../components/Header';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            dark: false
        }
    }

    alertme = () => {
        if(this.state.dark == false){
            Alert.alert('light');
            console.log('light');
        }
        else{
            Alert.alert('dark');
            console.log('dark');
        }
    }

    render(){
        return(
            <SafeAreaProvider>
                <View>
                    <ScreenHeader title = "Settings"/>
                    <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: 18}}>Appearance</Text>
                        <View style = {{flexDirection: 'row'}}>
                            <TouchableOpacity style = {styles.buttons} onPress = {() => {
                                this.setState({
                                    dark: false
                                })
                            }}>
                                <Text style = {styles.buttontext}>Light</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style = {styles.buttons} onPress = {() => {
                                this.setState({
                                    dark: true
                                })
                            }}>
                                <Text style = {styles.buttontext}>Dark</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style = {styles.buttons} onPress = {() => {
                            this.alertme()
                        }}>
                            <Text style = {styles.buttontext}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaProvider>
        )}
    }

const styles = StyleSheet.create({
    buttons: {
        backgroundColor: "#000",
        color: "#fff",
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        margin: 10
    },
    buttontext: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 16
    }
})