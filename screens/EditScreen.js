import React from 'react';
import { View, Text, StyleSheet, TextInput, Modal, ScrollView, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native';
import ScreenHeader from '../components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config'

export default class EditScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            addModalVisible: false,
            petname: '',
            petbreed: '',
            petspecies: '',
            petage: '',
            petbirthdate: '',
            emailId: firebase.auth().currentUser.email,
            count: '',
            id: '',
            updatename: ''
        }
    }

    componentDidMount(){
        db.collection('animals').where('email_id','==',this.state.emailId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    count: doc.data().count,
                    id: doc.id
                })
                console.log(this.state.count + " " + this.state.id)
            })
        })
    }

    addPets = async(/*updatename*/) => {
        //two options
        
        //adds as a new collection
        await db.collection('animals').doc(this.state.id).collection('pet'+this.state.count).add({
            name: this.state.petname,
            species: this.state.petspecies,
            breed: this.state.petbreed,
            age: this.state.petage
        })
        await db.collection('animals').doc(this.state.id).update({
            'count': firebase.firestore.FieldValue.increment(1)
        })
        this.setState({
            count: this.state.count+1
        })
        Alert.alert("Pet Added",'',[
            {title: 'ok', onPress: () => {
                this.setState({
                    "addModalVisible": false
                })
            }}
        ])

        //adds as a new field
        /*#updatename = 'pet'+this.state.count
        this.setState({
            updatename: updatename
        })
        //can i use a the state update name instead of the variable name in update function
        await db.collection('animals').doc(this.state.id).update({
            variable name: {
                name: this.state.petname
            }
        })*/
    }

    showModalForAdding = () => {
        return(
            <Modal animationType = 'none' visible = {this.state.addModalVisible}>
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

                            <TouchableOpacity style = {[styles.inputButton, {marginTop: 50}]}
                                onPress = {() => {
                                    this.addPets();
                                }}
                            >
                                <Text style = {{color: '#fff'}}>Add</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style = {[styles.inputButton, {marginTop: 50}]} onPress = {() => {
                                this.setState({
                                    addModalVisible: false
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
            <ScrollView>
            <View style = {styles.container}>
                <View>
                    <ScreenHeader title = "Edit"/>
                </View>

                <Text style = {{fontSize: 30, paddingTop: 20}}>Add or delete you pets here</Text>

                {this.showModalForAdding()}

                <View style = {{paddingBottom: 50, paddingTop: 50}}></View>
                <TouchableOpacity style = {styles.inputButton} onPress = {() => {
                    this.setState({
                        addModalVisible: true,
                        petname: '',
                        petspecies: '',
                        petbreed: '',
                        petage: ''
                    })
                }}>
                    <Text style = {{color: '#fff'}}>Add</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
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