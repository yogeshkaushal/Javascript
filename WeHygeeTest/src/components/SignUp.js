import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Header, Image, CheckBox, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Transition } from 'react-navigation-fluid-transitions'
import { useNavigation } from "react-navigation-hooks";

export default function SignUp() {

    const LogoImage = (props) => (
        <Image source={{ uri: 'https://picsum.photos/100/100?image=56' }} style={props.style} />
    );

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [check, setCheck] = useState({ maleCheck: false, femaleCheck: false, value: '' })

    const { maleCheck, femaleCheck, value } = check;
    const { navigate } = useNavigation();

    return (
        <View style={styles.mainView}>

            <KeyboardAwareScrollView animated={true}>
                <View style={{ alignItems: 'center' }}>
                    <Transition shared='logo' appear='scale'>
                        <LogoImage style={styles.largeLogo} />
                    </Transition>

                    <View style={styles.CheckBoxView}>
                        <CheckBox
                            title={'Male'}
                            iconLeft
                            checkedIcon='check'
                            checkedColor='green'
                            checked={maleCheck}
                            containerStyle={{ backgroundColor: '#ecf0f1', borderWidth: 0 }}
                            onPress={() => onPressMale()}
                        />

                        <CheckBox
                            title={'Female'}
                            iconLeft
                            checkedIcon='check'
                            checkedColor='green'
                            checked={femaleCheck}
                            containerStyle={{ backgroundColor: '#ecf0f1', borderWidth: 0 }}
                            onPress={() => onPressFemale()}
                        />

                    </View>

                    <TextInput placeholder='Name' style={styles.textInput}
                        onChangeText={(text) => { setName(text) }} />

                    <TextInput placeholder='Email' style={styles.textInput}
                        onChangeText={(text) => { setEmail(text) }} />

                    <TextInput placeholder='Password' style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(text) => { setPassword(text) }} />

                    <TextInput placeholder='Confirm Password' style={styles.textInput}
                        secureTextEntry={true}
                        onChangeText={(text) => { setConfirmPassword(text) }} />

                    <TextInput placeholder='Phone No' style={styles.textInput}
                        onChangeText={(text) => { setPhone(text) }} />

                    <Button title='Next' type='solid' onPress={() => navigate('screen2')}
                        containerStyle={{ padding: 20, width: '50%' }} />



                </View>
            </KeyboardAwareScrollView>
        </View>

    )

    function onPressMale() {
        if (maleCheck == false) {
            setCheck({ maleCheck: true, femaleCheck: false, value: 'Male' })
        }
    }
    function onPressFemale() {
        if (femaleCheck == false) {
            setCheck({ femaleCheck: true, maleCheck: false, value: 'Female' })
        }
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
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',

    },
    largeLogo: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginTop: 35
    },
    SignUp: {
        padding: '3%',
        alignSelf: "center",
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    CheckBoxView: {
        flexDirection: 'row',
        marginTop: 20
    }


})