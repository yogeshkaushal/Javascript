import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'


export default class LoginScreen extends Component {

    static navigationOptions = {
        header: null
    }

    render() {

        const { navigation } = this.props


        return (

            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1, }}
                keyboardShouldPersistTaps='always'
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <View style={styles.MainView}>

                    <View style={styles.headView}>
                        <Text style={styles.headMain}>Login</Text>
                    </View>

                       <View style={styles.LoginSignUpView}>


                    <View style={{
                        marginTop: 40,
                        alignItems: 'center'
                    }}>

                        <TextInput onChangeText={(text) => this.setState({
                            email: text
                        })}

                            placeholder='E-mail'
                            style={styles.UserNamePassword}
                            returnKeyType={'next'}
                            onSubmitEditing={() => {
                                this.secondTextInput.focus()
                            }}
                        />
                        <TextInput onChangeText={(text) => this.setState({
                            password: text
                        })}

                            placeholder='Password'
                            style={styles.UserNamePassword}
                            secureTextEntry={true}
                            autoCapitalize='none'
                            returnKeyType={'next'}
                            ref={(input) => { this.secondTextInput = input; }}

                        />

                        <TouchableOpacity onPress={() => {

                            if (this.state.email.length != 0 &&
                                this.state.password.length != 0) {
                                this.loginUser()
                                this.setState({
                                    dataLoaded: 'true'
                                })
                            }
                            else {
                                alert('Both fiels are required')
                            }


                        }}
                            style={styles.TouchableLogin}>
                            <Text style={{
                                fontSize: 17,
                                fontWeight: '500',
                                color: 'white',
                            }}>
                                Login
</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}
                        style={styles.TouchableSignUp}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text>
                                Don't have account?
                                    </Text>
                            <Text style={{ paddingLeft: 7, color: '#2D596D', fontWeight: '300', textDecorationLine: 'underline', }}>
                                SignUp
                                    </Text>
                        </View>

                    </TouchableOpacity>
                </View>
                </View>
            </KeyboardAwareScrollView>

        )
    }

}

const styles = StyleSheet.create({

    BackgroundColorView: {



    },
    LoginSignUpView: {
        justifyContent: 'center',
        padding: 20,
        alignSelf: 'center',
        elevation: 12,
        height: 500,
        width: '90%',
        marginTop: 100,
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute'
    },
    MainView: {
        flex: 1
    },
    TouchableLogin: {
        backgroundColor: '#2D596D',
        height: 50,
        width: '70%',
        marginTop: 80,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        elevation: 4
    },
    UserNamePassword: {
        borderBottomWidth: 0.7,
        marginTop: 20,
        width: '85%',
        fontSize: 17

    },
    TouchableSignUp: {
        alignItems: 'center',
        top: 30
    },
    headView: {
        height: 350,
        backgroundColor: '#2D596D',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    headMain: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 40,
        color: 'white',
        margin: 20
    },

})