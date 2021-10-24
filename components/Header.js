import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements';

export default class ScreenHeader extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Header
                leftComponent = {<Icon name = 'bars' type = 'font-awesome' onPress = {() => 
                    this.props.navigation.toggleDrawer()
                }/>}
                centerComponent = {{text: this.props.title, style: {fontSize: 20, fontWeight: 'bold'}}}
                rightComponent = {<Icon name = 'bell' type = 'font-awesome'/>}
                backgroundColor = '#eee'
            />
        )}
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
