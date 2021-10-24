import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal, ScrollView, KeyboardAvoidingView, Alert } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
            modalVisible: false,
            firstName: '',
            lastName: '',
            confirmPassword: '',
            contact: ''
        }
    }
    
    userLogin = () => {
        firebase.auth().signInWithEmailAndPassword(this.state.emailId, this.state.password).then(() => {
            this.props.navigation.navigate('main');
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorCode, errorMessage)
        })
    }

    userSignup = () => {
        if(this.state.password != this.state.confirmPassword){
            Alert.alert("Password doesnt match - Check your password")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(this.state.emailId, this.state.password).then(() => {
                db.collection('users').add({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    contact: this.state.contact,
                    email_id: this.state.emailId
                });
                return Alert.alert("User added successfully",'',[
                    {text: 'ok', onPress: () => this.setState({
                        "modalVisible": false
                    })}
                ]);
            })
            .catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorCode, errorMessage)
            })
        }
    }

    showModal = () => {
        return(
            <Modal animationType = 'none' visible = {this.state.modalVisible}>
                <View style = {{alignItems: 'center', paddingBottom: 50, paddingTop: 20}}>
                    <Text style = {{fontSize: 40}}>Registeration</Text>
                </View>
                <View>
                    <ScrollView style = {{width: '100%'}}>
                        <KeyboardAvoidingView style = {{alignItems: 'center'}}>
                            <TextInput style = {[styles.textinput, {paddingTop: 50}]} placeholder = "First Name" onChangeText = { (text) =>{
                                this.setState({
                                    firstName: text
                                })
                            }}></TextInput>

                            <TextInput style = {[styles.textinput, {paddingTop: 50}]} placeholder = "Last Name" onChangeText = { (text) =>{
                                this.setState({
                                    lastName: text
                                })
                            }}></TextInput>

                            <TextInput style = {[styles.textinput, {paddingTop: 50}]} placeholder = "Email id" keyboardType = 'email-address' onChangeText = { (text) =>{
                                this.setState({
                                    emailId: text
                                })
                            }}></TextInput>

                            <TextInput style = {[styles.textinput, {paddingTop: 50}]} placeholder = "Password" secureTextEntry = {true} onChangeText = { (text) =>{
                                this.setState({
                                    password: text
                                })
                            }}></TextInput>

                            <TextInput style = {[styles.textinput, {paddingTop: 50}]} placeholder = "Confirm Password" secureTextEntry = {true} onChangeText = { (text) =>{
                                this.setState({
                                    confirmPassword: text
                                })
                            }}></TextInput>
                            
                            <TextInput style = {[styles.textinput, {paddingTop: 50}]} placeholder = "Contact Number" keyboardType = 'number-pad' maxLength = {10} onChangeText = { (text) =>{
                                this.setState({
                                    contact: text
                                })
                            }}></TextInput>

                            <TouchableOpacity style = {[styles.buttons, {marginTop: 50}]} onPress = {() => {
                                this.userSignup()
                            }}>
                                <Text style = {{color: '#fff'}}>Sign up</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity style = {[styles.buttons, {marginTop: 50}]} onPress = {() => {
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
            <View style = {styles.mainview}>
                <View>
                    <Text style = {{fontSize: 40, fontWeight: "bold"}}>Animal Care</Text>
                </View>

                {this.showModal()}

                <View style = {{paddingTop: 50}}>
                    <TextInput style = {styles.textinput} placeholder = "Email id" keyboardType = "email-address" onChangeText = {(text) => {
                        this.setState({
                            emailId: text
                        })
                    }}></TextInput>

                    <TextInput style = {styles.textinput} placeholder = "Password" secureTextEntry = {true} onChangeText = {(text) => {
                        this.setState({
                            password: text
                        })
                    }}></TextInput>
                </View>

                <View style = {{paddingTop: 50}}>
                    <TouchableOpacity style = {styles.buttons} onPress = {() => {
                        this.userLogin()
                    }}>
                        <Text style = {{color: "#fff"}}>Sign in</Text>
                    </TouchableOpacity>

                    <View style = {{paddingBottom: 20, paddingTop: 20}}></View>

                    <TouchableOpacity style = {styles.buttons} onPress = {() => {
                        this.setState({
                            modalVisible: true
                        })
                    }}>
                        <Text style = {{color: "#fff"}}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}
    }

const styles = StyleSheet.create({
    mainview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textinput: {
        borderBottomColor: "#000",
        borderBottomWidth: 2,
        width: 300,
        paddingLeft: 10,
        paddingTop: 20,
        fontSize: 16
    },
    buttons: {
        backgroundColor: "#000",
        color: "#fff",
        width: 200,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        
    }
})