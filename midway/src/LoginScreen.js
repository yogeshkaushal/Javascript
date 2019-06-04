import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import { AsyncStorage } from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay'


class LoginScreen extends Component {


    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            phoneno: '',
            Gender: '',
            username: '',
            password: '',
            newToken: '',
            dataLoaded: 'false',
            spinner: false


        }
    }


    fetchData = (Uid) => {
        console.log('Fetch User Uid is ' + Uid)
        firebase.firestore().collection("students").where("uId", "==", Uid)
            .get() 
            .then(querySnapshot => {

                let a;
                querySnapshot.forEach((doc) => {

                    a = doc.data()

                    this.props.setData(a.username, a.phoneNo, a.gender, this.state.email, Uid)
                    console.log(a.username + a.gender, a.phoneNo + a.email)

                    this.getToken(Uid)
                })
            })
            .catch(error => {
                console.log(error)

            })

    }

    _storeDataLocally = async (Uid) => {
        try {
            console.log('Async Uid is ' + Uid)
            await AsyncStorage.setItem('uid', Uid);
            console.log('data saved')
            this.fetchData(Uid)
        } catch (error) {
            console.log(error)
        }
    };

    getToken(Uid) {
        firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    console.log('new token is ' + fcmToken)
                    this.updateToken(fcmToken, Uid)
                } else {
                    alert('token denied')
                }
            });
    }

    updateToken = (token, Uid) => {
        console.log('uid from update token is ' + Uid)
        firebase.firestore().collection('students').where("uId", "==", Uid)
            .get()
            .then(function (querysnapshot) {
                querysnapshot.forEach(function (doc) {
                    doc.ref.update({ token: token })
                })
            })
    }

    loginUser = () => {

        firebase.auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(res => {
                this.setState({
                    dataLoaded: 'false',
                    spinner:false
                })
                Uid = firebase.auth().currentUser.uid
                this._storeDataLocally(Uid);
                this.props.navigation.navigate('innerStack')


            })

            .catch(error => {
                alert(error)
                this.setState({
                    dataLoaded: 'false',
                    spinner:false
                })
            })

    }

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
                        <Spinner
                            visible={this.state.spinner}
                            textContent={'Loading...'}
                            textStyle={styles.spinnerTextStyle}
                        />
                        <View style={styles.headView}>
                            <Text style={styles.headMain}>Login</Text>
                        </View>


                        <View style={styles.LoginSignUpView}>

                            <Text style={{
                                alignSelf: 'center',
                                fontSize: 20,
                                fontWeight: '300',
                                color: 'black'

                            }}>
                                Welcome back!
                        </Text>
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

                            <TouchableOpacity onPress={() => {

                                if (this.state.email.length != 0 &&
                                    this.state.password.length != 0) {
                                    this.loginUser()
                                    this.setState({
                                        dataLoaded: 'true',
                                        spinner:true
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

                    </View>
                </KeyboardAwareScrollView>
            )
        }

    }

//}

function mapStateToProps(state) {
    return {
        name: state.name,
        email: state.email,
        uid: state.uid
    }
}
function mapDispatchToprops(dispatch) {
    return {
        setData: (username, phoneNo, gender, email, uid) => dispatch({

            type: 'SET_DATA',

            username,
            phoneNo,
            gender,
            email,
            uid
        })

    }

}

export default connect(mapStateToProps, mapDispatchToprops)(LoginScreen)


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
        flex: 1,

    },
    spinnerTextStyle: {
        color: '#FFF'
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