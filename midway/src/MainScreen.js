import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';

// const TabNavigator = createBottomTabNavigator({
//     login: LoginScreen,
   
//   });
  
//   export default createAppContainer(TabNavigator)(MainScreen);

export default class MainScreen extends Component {

    constructor(props) {
        super(props)

        this.state={
            tokenid:''
        }

    }

    static navigationOptions = {
        header: null
    }

    getToken=()=>{
        firebase.messaging().getToken()
                    .then(fcmToken => {
                        if (fcmToken) {
                           this.setState({
                                tokenid:fcmToken
                           })
                           alert(fcmToken)
                        } else {
                          alert('token denied')
                        }
                    });
    }

      deleteToken = () => {
        firebase.firestore().collection('users').where('uid', '==', this.props.uid)
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(function (doc) {
                    doc.ref.update({
                        token: firebase.firestore.FieldValue.delete()
                    })
                })
            })
            .then(
                this.getToken()
            )
            .then(
                firebase.auth().signOut()
            )
            .then(
                 this.props.navigation.navigate('Login')
            
            )
    }

    render() {
        return (
            <View>
                <View>
                    <TouchableOpacity style={{
                        flexDirection: 'row-reverse',
                        margin: 15,
                        marginLeft: 10
                    }}
                    
                    onPress={()=>{
                        this.deleteToken();
                    }}
                    >
                        <Text style={{
                            backgroundColor: '#5ed6bf',
                            padding: 8,
                            borderRadius: 5,
                            fontWeight: 'bold',
                            color: 'white'

                        }}>
                            Logout
                    </Text>
                    </TouchableOpacity >
                </View>

                <Text style={{
               alignSelf:'center',
                    color: 'black'
                }} >
                    this is MainScreen
                </Text>
            </View>
        )
    }
}