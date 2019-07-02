import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, AsyncStorage, ScrollView, Platform, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Header, Image } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CheckBox from './CheckBox'
// import firebase from 'react-native-firebase';
// import { connect } from 'react-redux'
// import Spinner from 'react-native-loading-spinner-overlay'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            maleCheck: false,
            femaleCheck: false,
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',

        }
    }

    render() {
        return (
            <View style={styles.mainView}>
                <Header
                    leftComponent={<TouchableOpacity><Ionicons name='ios-arrow-back' size={25} color='#000' /></TouchableOpacity>}
                    centerComponent={{ text: 'SignUp', style: { fontSize: 20, color: '#000' } }}
                    containerStyle={{
                        backgroundColor: 'white',
                        justifyContent: 'space-around',
                        paddingTop: 0,
                    }}
                />

                <KeyboardAwareScrollView animated={true}>
                    <View style={{ alignItems: 'center' }}>
                        <Image

                            style={{ width: 110, height: 110, borderColor: 'grey', borderWidth: 1, borderRadius: 360 }}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                        <CheckBox maleCheck={this.state.maleCheck} femaleCheck={this.props.femaleCheck}

                            onPressMale={() => {
                                this.onPressMale()
                            }} 
                            
                            onPressFemale={()=>{
                                this.onPressFemale()
                            }}/>
                            
                        <TextInput placeholder='Name' style={styles.textInput} onChangeText={(text) => {
                            this.setState = ({
                                name: text
                            })
                        }} />
                        <TextInput placeholder='Email' style={styles.textInput} onChangeText={(text) => {
                            this.setState = ({
                                email: text
                            })
                        }} />
                        <TextInput placeholder='Password' style={styles.textInput} onChangeText={(text) => {
                            this.setState = ({
                                password: text
                            })
                        }} />
                        <TextInput placeholder='Confirm Password' style={styles.textInput} onChangeText={(text) => {
                            this.setState = ({
                                confirmPassword: text
                            })
                        }} />
                        <TextInput placeholder='Phone No' style={styles.textInput} onChangeText={(text) => {
                            this.setState = ({
                                phone: text
                            })
                        }} />
                        <TouchableOpacity style={styles.Button}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
                                Next
                            </Text>
                        </TouchableOpacity>

                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }

    onPressMale = () => {
        console.log('Initial Value'+ this.state.maleCheck)
        this.state.maleCheck == true ? false : true
        console.log('changed Value'+ this.state.maleCheck)
    }

    onPressFemale = () => {
        console.log('Initial Value'+ this.state.femaleCheck)
        this.state.femaleCheck == true ? false : true
        console.log('changed Value'+ this.state.femaleCheck)
    }

}

const styles = StyleSheet.create({

    textInput: {
        borderWidth: 1,
        width: '80%',
        marginTop: 20,
        alignSelf: 'center',
        paddingLeft: 10,
        paddingVertical: 7
    },
    mainView: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',

    },
    NavBar: {
        backgroundColor: 'red',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 15,
    },
    SignUp: {
        padding: '3%',
        alignSelf: "center",
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    Button: {
        backgroundColor: 'blue',
        width: '60%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        borderRadius: 8
    },
    CheckBoxView: {
        flexDirection: 'row',
        marginTop: 20
    }


})