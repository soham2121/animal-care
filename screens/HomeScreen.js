import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import ScreenHeader from '../components/Header';
import firebase from 'firebase';
import db from '../config';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            allanimals: [],
            count: '',
            id: '',
            emailId: firebase.auth().currentUser.email,
            data: ''
        }
    }

    componentDidMount(){
        this.getAnimals()
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
                <View style = {{marginTop: 10, marginBottom: 10, flexDirection: 'column'}}>
                    <Text style = {styles.flatlisttext}>Name: {item.name}</Text>
                    <Text style = {styles.flatlisttext}>Species: {item.species}</Text>
                    <Text style = {styles.flatlisttext}>Breed: {item.breed}</Text>
                    <Text style = {styles.flatlisttext}>Age: {item.age}</Text>
                </View>
                <View>
                    <TouchableOpacity style = {styles.renderbutton}>
                        <Text style = {{color: '#fff', fontSize: 14}}>More Info</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    
    render(){
        return(
            <SafeAreaProvider>
                <View>
                    <ScreenHeader title = "Home"/>
                </View>
                <View style = {{alignItems: 'center'}}>
                    <Text style = {{fontSize: 20}}>Total pets: {this.state.count}</Text>
                </View>
                <View>
                    <FlatList keyExtractor = {this.keyExtractor}
                    data = {this.state.data}
                    renderItem = {this.renderItem}>
                    </FlatList>
                </View>
                <View style = {{alignItems: 'center', marginTop: 10}}>
                    <TouchableOpacity style = {styles.renderbutton} onPress = {() => {
                        this.getAnimals()
                    }}>
                        <Text style = {{color: '#fff'}}>Reload</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaProvider>
        )}
    }

const styles = StyleSheet.create({
    flatlisttext: {
        backgroundColor: '#eee',
        fontSize: 20,
        paddingRight: 10,
    },
    renderbutton: {
        width: 150, 
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
    }
})