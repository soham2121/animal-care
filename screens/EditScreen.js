import React from 'react';
import { View, Text, StyleSheet, TextInput, Modal, ScrollView, KeyboardAvoidingView, Alert, TouchableOpacity, Dimensions } from 'react-native';
import ScreenHeader from '../components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class EditScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            modalVisible: false,
            petname: '',
            petbreed: '',
            petspecies: '',
            petage: '',
            petbirthdate: '',
        }
    }

    showModalForAdding = () => {
        return(
            <Modal animationType = 'none' visible = {this.state.modalVisible}>
                <View style = {{alignItems: 'center', paddingBottom: 50, paddingTop: 20}}>
                    <Text style = {{fontSize: 40}}>Add A Pet</Text>
                </View>
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView style = {{alignItems: 'center'}}>
                            <TextInput style = {styles.textInput} placeholder = "Name of the pet" onChangeText = {(text) => {
                                this.setState({
                                    petname: text
                                })
                            }}>
                            </TextInput>

                            <TextInput style = {styles.textInput} placeholder = "Species of the pet" onChangeText = {(text) => {
                                this.setState({
                                    petspecies: text
                                })
                            }}>
                            </TextInput>

                            <TextInput style = {styles.textInput} placeholder = "Breed of the pet" onChangeText = {(text) => {
                                this.setState({
                                    petbreed: text
                                })
                            }}>
                            </TextInput>

                            <TextInput style = {styles.textInput} placeholder = "Age of the pet" keyboardType = 'numeric'
                            onChangeText = {(text) => {
                                this.setState({
                                    petage: text
                                })
                            }}>
                            </TextInput>

                            <TouchableOpacity style = {[styles.inputButton, {marginTop: 50}]}>
                                <Text style = {{color: '#fff'}}>Add</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style = {[styles.inputButton, {marginTop: 50}]} onPress = {() => {
                                this.setState({
                                    modalVisible: false
                                })
                            }}>
                                <Text style = {{color: '#fff'}}>Cancel</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <SafeAreaProvider>
            <View style = {styles.container}>
                <View>
                    <ScreenHeader title = "Edit Screen"/>
                </View>

                <Text style = {{fontSize: 30, paddingTop: 20}}>Add or delete you pets here</Text>

                {this.showModalForAdding()}

                <View style = {{paddingBottom: 50, paddingTop: 50}}></View>
                <TouchableOpacity style = {styles.inputButton} onPress = {() => {
                    this.setState({
                        modalVisible: true,
                        petname: '',
                        petspecies: '',
                        petbreed: '',
                        petage: ''
                    })
                }}>
                    <Text style = {{color: '#fff'}}>Add</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaProvider>
        )}
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textInput: {
        borderBottomColor: '#000',
        borderBottomWidth: 2,
        width: 300,
        paddingLeft: 10,
        paddingTop: 50,
        fontSize: 16
    },
    inputButton: {
        backgroundColor: '#000',
        color: '#fff',
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        shadowOffset: {width: 10, height: 10},
        shadowColor: '#000',
        shadowOpacity: 0.3
    }
})