import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ImageBackground, AsyncStorage, Alert } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import firebase from 'react-native-firebase'

export default class MainScreen extends Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <ImageBackground
                source={require("../Images/index.jpeg")}
                style={styles.backgroundImage} >

                <View style={styles.overlay} />

                <TouchableOpacity
                    style={{
                        alignSelf: 'flex-end',
                        position: 'absolute',
                        margin: '5%'
                    }}
                    onPress={() => this.optionProfile()}
                >
                    <FontAwesome5 name="power-off" size={25} color='white' />
                </TouchableOpacity>

                <Text style={{
                    color: 'white',
                    fontSize: 25,
                    alignSelf: 'center',
                    top: '20%'
                }}>Select Your Option</Text>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Office')}
                        style={styles.touchable}>
                        <Text style={styles.Text}>
                            Office Management</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate("SittingManagement")
                        }}
                        style={[styles.touchable, styles.touchableSeats]}>
                        <Text style={styles.Text}>
                            Manage Seats</Text>

                    </TouchableOpacity>

                </View>
            </ImageBackground>

        )
    }

    optionProfile = () => {
        Alert.alert(
            '',
            'Would you really want to logout',
            [
                {
                    text: 'Logout', style: 'destructive', onPress: () => {
                        firebase
                            .auth()
                            .signOut()
                            .then(() => {
                                this.removeItemValue('uid')
                                this.props.navigation.navigate('Login')
                            })
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }

            ],
            { cancelable: false },
        )

    }

    async removeItemValue(key) {
        try {
            console.log('in remove Item async')
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {

            console.log(exception)
            return false;
        }
    }
}

const styles = StyleSheet.create({

    touchable: {
        backgroundColor: '#184755',
        height: 50,
        width: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        elevation: 5
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    touchableSeats: {
        backgroundColor: '#d4344d',
        marginTop: 30,
    },
    Text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    backgroundImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        flexDirection: 'column',
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
    }

})