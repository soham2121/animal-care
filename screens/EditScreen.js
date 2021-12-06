import React from 'react';
import { View, Text, StyleSheet, TextInput, Modal, ScrollView, KeyboardAvoidingView, Alert, TouchableOpacity, FlatList } from 'react-native';
import ScreenHeader from '../components/Header';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import firebase from 'firebase';
import db from '../config'

export default class EditScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            addModalVisible: false,
            advanceedit: false,
            editModalVisible: false,
            data: '',
            petname: '',
            petbreed: '',
            petspecies: '',
            petage: '',
            petbirthdate: '',
            emailId: firebase.auth().currentUser.email,
            count: '',
            id: '',
            updatename: '',
            findpet: '',
            petid: ''
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

        this.getAnimals()
    }

    

    addPets = async() => {
        await db.collection('animals').doc(this.state.id).collection('pets').add({
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
                this.getAnimals()
            }}
        ])
    }

    getAnimals = async() => {
        await db.collection('animals').where('email_id','==',this.state.emailId).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                this.setState({
                    count: doc.data().count,
                    id: doc.id
                })
            })
        })

        var dataarr = [], a = '';
        
        await db.collection('animals').doc(this.state.id).collection('pets').get().then((snapshot) => {
            snapshot.forEach((doc) => {
                a = doc.data()
                dataarr.push(a)
            })
        })
        
        this.setState({
            data: dataarr
        })
    }

    keyExtractor = (item, index) => index.toString();

    renderItem = ({item, i}) => {
        return(
            <View style = {{alignItems: 'center', borderBottomWidth: 1, borderColor: '#000', paddingBottom: 10}}>
                <View style = {{marginTop: 10, marginBottom: 10 }}>
                    <Text>{item.name}</Text>
                </View>
                <View style = {{marginTop: 5, flexDirection: 'row'}}>
                    <TouchableOpacity style = {[styles.inputButton, {width: 100, marginRight: 10}]} onPress = {() => {
                        this.setState({
                            findpet: item.name,
                            advanceedit: true,
                            editModalVisible: false
                        })
                        this.getPetInfoForEdit()
                    }}>
                        <Text style = {{color: '#fff'}}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {[styles.inputButton, {width: 100, marginLeft: 10}]}>
                        <Text style = {{color: '#fff'}}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    getPetInfoForEdit = async() => {
        await db.collection('animals').doc(this.state.id).collection('pets').where('name','==',this.state.findpet).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var a = doc.id
                this.setState({
                    petid: a
                })
                console.log(this.state.petid)
            })
        })
        await db.collection('animals').doc(this.state.id).collection('pets').where('name','==',this.state.findpet).get().then((snapshot) => {
            snapshot.forEach((doc) => {
                var a = doc.id
                this.setState({
                    petid: a
                })
                console.log(this.state.petid)
            })
        })
    }

    showModalForAdvanceEdit = () => {
        return(
            <Modal animationType = 'none' visible = {this.state.advanceedit}>
                <ScrollView>
                    <KeyboardAvoidingView>
                        <View style = {{alignItems: 'center', paddingBottom: 50, paddingTop: 20}}>
                            <Text style = {{fontSize: 40}}>{this.state.findpet}</Text>
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

                                    <TouchableOpacity style = {[styles.inputButton, {marginTop: 50}]} onPress = {() => {
                                            db.collection('animals').doc(this.state.id).collection('pets').doc(this.state.petid)
                                            .update({
                                                name: this.state.petname,
                                                species: this.state.petspecies,
                                                breed: this.state.petbreed,
                                                age: this.state.petage
                                            })
                                            this.setState({
                                                advanceedit: false
                                            })
                                            Alert.alert('Pet information updated','',[{title: 'ok',onPress: () =>{this.getAnimals()}}])
                                        }}>
                                        <Text style = {{color: '#fff'}}>Confirm</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style = {[styles.inputButton, {marginTop: 50}]} onPress = {() => {
                                            this.setState({
                                                advanceedit: false
                                            })
                                        }}>
                                        <Text style = {{color: '#fff'}}>Cancel</Text>
                                    </TouchableOpacity>
                                </KeyboardAvoidingView>
                            </ScrollView>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </Modal>
        )
    }

    

    showModalForBasicEdit = () => {
        return(
            <Modal animationType = 'none' visible = {this.state.editModalVisible}>
                <View style = {{alignItems: 'center', paddingBottom: 50, paddingTop: 20}}>
                    <Text style = {{fontSize: 40}}>Edit Pets</Text>
                </View>
                <View>
                    <ScrollView>
                        <KeyboardAvoidingView style = {{alignItems: 'center'}}>
                            <FlatList keyExtractor = {this.keyExtractor}
                            data = {this.state.data}
                            renderItem = {this.renderItem}
                            style = {{width: '100%'}}
                            ></FlatList>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
                <View style = {{alignItems: 'center'}}>
                    <TouchableOpacity style = {[styles.inputButton, {marginTop: 50}]} onPress = {() => {
                        this.setState({
                            editModalVisible: false
                        })
                    }}>
                        <Text style = {{color: '#fff'}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
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
                        {this.showModalForBasicEdit()}
                        {this.showModalForAdvanceEdit()}

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

                        <TouchableOpacity style = {[styles.inputButton, {marginTop: 50}]} onPress = {() => {
                            this.setState({
                                editModalVisible: true
                            })
                        }}>
                            <Text style = {{color: '#fff'}}>Edit</Text>
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