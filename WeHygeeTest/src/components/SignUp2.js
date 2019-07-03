import React, { Component, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { Header, Image, CheckBox, Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Transition } from 'react-navigation-fluid-transitions'
import { useNavigation } from "react-navigation-hooks";


export default function SignUp2() {

    const LogoImage = (props) => (
        <Image source={{ uri: 'https://picsum.photos/100/100?image=56' }} style={props.style} />
    );
    const { navigate } = useNavigation();


    const [Ethenticity, setEthenticity] = useState('');
    const [Religion, setReligion] = useState('')
    const [Height, setHeight] = useState('')
    const [Occupation, setOccupation] = useState('')
    const [IAm, setIAm] = useState('')
    const [ILike, setILike] = useState('')
    const [IAppriciate, setIAppriciate] = useState('')

    return (
        <View style={styles.mainView}>

            <Transition shared='logo' appear='scale'>
                <LogoImage style={styles.smallLogo} />
            </Transition>

            <TextInput placeholder='Ethenticity' style={styles.textInput}
                onChangeText={(text) => { setEthenticity(text) }} />

            <TextInput placeholder='Religion' style={styles.textInput}
                onChangeText={(text) => { setReligion(text) }} />

            <TextInput placeholder='Height' style={styles.textInput}
                onChangeText={(text) => { setHeight(text) }} />

            <TextInput placeholder='Occupation' style={styles.textInput}
                onChangeText={(text) => { setOccupation(text) }} />

            <TextInput placeholder='I am...' style={styles.textInput}
                onChangeText={(text) => { setIAm(text) }} />

            <TextInput placeholder='I like...' style={styles.textInput}
                onChangeText={(text) => { setILike(text) }} />

            <TextInput placeholder='I appriciate when my Date...' style={styles.textInput}
                onChangeText={(text) => { setIAppriciate(text) }} />

            <Button title='Back' type='solid' onPress={() => navigate('screen1')}
                containerStyle={{ padding: 20, width: '50%' }} />



        </View>
    )

}

const styles = StyleSheet.create({

    textInput: {
        borderWidth: 1,
        width: '80%',
        marginTop: 20,
        alignSelf: 'center',
        paddingLeft: 10,
    },
    smallLogo: {
        marginTop:20,
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',

    }
})