import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Platform, Alert } from 'react-native';
// import { KeyboardAwareView } from 'react-native-keyboard-aware-view'
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native';
// import { type } from 'os';
import Spinner from 'react-native-loading-spinner-overlay'



class SignupScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password1: '',
            password2: '',
            error: '',
            token: '',
            spinner: false
        }

    }


    _storeDataLocally = async (uid) => {
        try {
            console.log('Uid signUp is '+ uid)
            await AsyncStorage.setItem('uid', uid);
            console.log('data saved')
        } catch (error) {
            console.log(error)
        }
    };

    getToken = () => {
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    this.addUser(fcmToken)
                } else {
                    alert('token denied')
                }
            });
    }

    addUser = (newtoken) => {
        firebase.auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password1)
            .then(() => {
                const { currentUser } = firebase.auth()

                firebase.firestore().collection("students").add({
                    username: this.state.username,
                    email: this.state.email,
                    uId: currentUser.uid,
                    token: newtoken
                })

                this._storeDataLocally(currentUser.uid)
                console.log(this.state.username + this.state.email)
                this.props.setData(this.state.username, this.state.email,currentUser.uid)
                this.setState({ error: '' })

                this.setState({
                    spinner:false
                })

                this.props.navigation.navigate('innerStack')

            }

            )
            .catch((error) => {

                var errorMessage = error.message;
                this.setState({
                    error: errorMessage,
                    spinner:false
                })
            }
            );

    }

    validatePass = () => {
        if (this.state.password1 == this.state.password2) {

            this.getToken()
        } else {
            this.setState({
                spinner:false
            })
            this.setState({ error: "Passwords doesn't match. Try Again" })
        }
    }



    render() {

        const { navigation } = this.props

        return (
            // <KeyboardAwareView>
            //     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <View style={styles.containerMain}>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />

                <View style={styles.headView}>
                    <Text style={styles.headMain}>Sign Up</Text>
                </View>

                <View style={styles.btmView}>
                    <TextInput placeholder='Username'
                        placeholderTextColor='#9ea0a5'
                        style={[styles.textInput1, { marginTop: (Platform.OS === 'ios') ? 60 : 40 }]}
                        autoCapitalize='none'
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}

                        onChangeText={(text) => {
                            this.setState({ username: text })
                        }}
                    />


                    <TextInput placeholder='Email'
                        placeholderTextColor='#9ea0a5'
                        style={styles.textInput1}
                        autoCapitalize='none'
                        ref={(input) => { this.secondTextInput = input; }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.thirdTextInput.focus(); }}

                        onChangeText={(text) => {
                            this.setState({ email: text })
                        }}
                    />


                    <TextInput placeholder='Password'
                        placeholderTextColor='#9ea0a5'
                        style={styles.textInput1}
                        autoCapitalize='none'
                        secureTextEntry={true}
                        ref={(input) => { this.thirdTextInput = input; }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.fourthTextInput.focus(); }}

                        onChangeText={(text) => {
                            this.setState({ password1: text })
                        }}
                    />


                    <TextInput placeholder='Confirm Password'
                        placeholderTextColor='#9ea0a5'
                        style={styles.textInput1}
                        secureTextEntry={true}
                        autoCapitalize='none'
                        ref={(input) => { this.fourthTextInput = input; }}
                        returnKeyType={"go"}

                        onChangeText={(text) => {
                            this.setState({ password2: text })
                        }}
                    />


                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            marginTop: (Platform.OS === 'ios') ? 60 : 30, color: 'black'
                        }}>
                            Already have account?
                        </Text>
                        <TouchableOpacity>
                            <Text onPress={() => this.props.navigation.navigate('Login')}
                                style={{
                                    color: "#2D596D",
                                    fontWeight: 'bold',
                                    textDecorationLine: 'underline',
                                    marginTop: 30,
                                    marginLeft: 10
                                }}

                            >Login
                        </Text>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity style={styles.btnSignUp}
                        onPress={() => {
                            if (this.state.username.length != 0 &&
                                this.state.email.length != 0 &&
                                this.state.password1.length != 0 &&
                                this.state.password2.length != 0) {

                                this.validatePass()
                                    this.setState({
                                        spinner:true
                                    })

                            }
                            else {
                                alert('All fields are required...')
                            }

                        }}
                    >
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: 'white',
                        }}>
                            SignUp
                            </Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'red', marginTop: 5 }}>{this.state.error}</Text>

                </View>

            </View>
            //     </ScrollView>
            // </KeyboardAwareView>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setData: (username, email,uid) => dispatch({
            type: 'SET_DATA',
            username,
            email,
            uid
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen)

const styles = StyleSheet.create({
    containerMain: {
        flex: 1,
    },
    headView: {
        height: (Platform.OS === 'ios') ? 300 : 350,
        backgroundColor: '#2D596D',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    btmView: {
        height: (Platform.OS === 'ios') ? 550 : 500,
        backgroundColor: 'white',
        position: 'absolute',
        width: '90%',
        margin: 20,
        top: (Platform.OS === 'ios') ? 160 : 100,
        alignItems: "center",
        shadowColor: '#868686',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 12,
        borderRadius: 10,
    },
    headMain: {
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: (Platform.OS === 'ios') ? 120 : 40,
        color: 'white',
        margin: 20
    },
    textInput1: {
        width: '80%',
        fontSize: 17,
        marginTop: (Platform.OS === 'ios') ? 40 : 30,
        padding: 10,
        borderBottomWidth: .5,
        borderBottomColor: '#5f626b'
    },
    btnSignUp: {
        height: 50,
        width: '70%',
        marginTop: (Platform.OS === 'ios') ? 37 : 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2D596D',
        borderRadius: 40,
    },
    spinnerTextStyle: {
        color: '#FFF'
      },
})