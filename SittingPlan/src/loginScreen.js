import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput,AsyncStorage ,ScrollView, Platform, ActivityIndicator,Alert } from 'react-native';
 import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import firebase from 'react-native-firebase'
import Spinner from 'react-native-loading-spinner-overlay'


export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        email: '',
        password: '',
        error: '',
        user:'',
        array:[],
        authenticating:false
    }

    _storeDataLocally = async (Uid) => {
        console.log(Uid)
        try {
            console.log('Async Uid is ' + Uid)
            await AsyncStorage.setItem('uid', Uid);
            console.log('data saved')
            this.props.navigation.navigate('MainStack')
        } catch (error) {
            console.log(error)
        }
    };

    render() { 

        return (
             <KeyboardAwareView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
                    <Spinner
                            visible={this.state.authenticating}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <View style={styles.headView}>

                        </View>
                        <View style={styles.bottomView}>
                            <Text style={{
                                fontSize: 20,
                                fontWeight: '300',
                                marginTop: 60,
                                color: 'black'

                            }}>
                                Welcome back!
                    </Text>

                            <TextInput placeholder='Username'
                                style={styles.textInput1}
                                autoCapitalize='none'
                                returnKeyType={"next"}
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                onChangeText={(text) => {
                                    this.setState({ email: text })
                                }}

                            />

                            <TextInput placeholder='Password'
                                secureTextEntry={true}
                                style={styles.textInput2}
                                ref={(input) => { this.secondTextInput = input; }}
                                returnKeyType={"go"}
                                onChangeText={(text) => {
                                    this.setState({ password: text })
                                }}
                                onSubmitEditing={() => {
                                    if(this.state.email.length != 0 && this.state.password.length != 0)
                                    {
                                    this.SignInUser(this.state.email, this.state.password)
                                    this.setState({
                                        authenticating:true
                                    })
                                }
                                else {
                                    Alert.alert(
                                        'Empty Field',
                                        'One of your field is empty enter some text to Continue'
                                    )
                            }
                                }}
                            />


                            <TouchableOpacity style={styles.btnLogin}
                                onPress={() => {
                                    if(this.state.email.length != 0 && this.state.password.length != 0)
                                    {
                                    this.SignInUser(this.state.email, this.state.password)
                                    this.setState({
                                        authenticating:true
                                    })
                                }
                                else {
                                    Alert.alert(
                                        'Empty Field',
                                        'One of your field is empty enter some text to Continue'
                                    )
                            }   
                                }}
                            >
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: '500',
                                    color: 'white',
                                }}

                                >
                                    Login
                            </Text>
                            </TouchableOpacity >
                            <Text style={{ color: 'red', marginTop: 5,marginLeft:20,marginRight:20 }}>{this.state.error}</Text>
                        </View>
                    </View>

                </ScrollView>
             </KeyboardAwareView>
        )}
                          
            SignInUser = (email, password) => {
                this.setState({authenticating:true})
                firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    .then(() => {
                                const { currentUser } = firebase.auth()
                                // const email = currentUser.email
                                this._storeDataLocally(currentUser.uid)
                                this.props.navigation.navigate('MainStack').then(() => {
                                this.setState({ authenticating: false });
                              })
                       
                    })
                    .catch((error) => {
                        console.log("Error Code is")
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log("Error Code is" + errorCode)
                        console.log("Error message is" + errorMessage)
                        this.setState({
                            authenticating:false,
                            error: errorMessage
                        })
                    }
                    )

    }}
 
      

const styles = StyleSheet.create({
    headView: {
        height: 300,
        backgroundColor: '#184755',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
    bottomView: {
        backgroundColor: 'white',
        position: 'absolute',
        height: (Platform.OS === 'ios') ? 550 : 480,
        width: '90%',
        marginTop: (Platform.OS === 'ios') ? '40%' : '35%',
        alignItems: 'center',
        justifyContent: (Platform.OS === 'ios') ? 'center' : 'flex-start',
        margin: 20,
        borderRadius: 10,
        shadowColor: '#868686',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 12
    },
    textInput1: {
        width: '80%',
        fontSize: 17,
        marginTop: (Platform.OS === 'ios') ? 60 : 40,
        padding: 10,
        borderBottomWidth: .7,
        borderBottomColor: '#868686'
    },
    textInput2: {
        width: '80%',
        fontSize: 17,
        marginTop: (Platform.OS === 'ios') ? 30 : 20,
        padding: 10,
        borderBottomWidth: .5,
        borderBottomColor: '#868686'
    },
    btnLogin: {
        height: 50,
        width: '70%',
        marginTop: (Platform.OS === 'ios') ? 50 : 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#184755',
        borderRadius: 40,
    }
})