import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ScreenHeader from '../components/Header';
import firebase from 'firebase';
import db from '../config';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            allanimals: [],
            count: '',
            id: '',
            emailId: firebase.auth().currentUser.email
        }
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
        for(var i = 0; i < this.state.count; i++){
            await db.collection('animals').doc(this.state.id).collection('pet'+i).get().then((snapshot) => {
                snapshot.forEach((doc) => {
                    var name = doc.data().name;
                    var breed = doc.data().breed;
                    var species = doc.data().species;
                    var age = doc.data().age;
                    console.log(name)
                    console.log(breed)
                    console.log(species)
                    console.log(age)
                })
            })
        }
    }

    render(){
        return(
            <SafeAreaProvider>
                <View>
                    <ScreenHeader title = "Home"/>
                    <Text>Home Screen</Text>
                </View>
                <View style = {{alignItems: 'center'}}>
                    <TouchableOpacity style = {{width: 200, height: 50, backgroundColor: '#aaa'}} onPress= {() => {
                        this.getAnimals()
                    }}>
                        <Text>press me</Text>
                    </TouchableOpacity>
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