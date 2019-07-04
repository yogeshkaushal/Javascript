import React, { Component } from 'react'
import { View, Text, ActivityIndicator, AsyncStorage,StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'

export default class LoadingScreen extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
        setTimeout(()=>{
            this._retrieveData()
        },1500)

    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#184755', alignItems:'center',justifyContent:'center'}}>

                <View style={{alignItems: 'center', justifyContent: 'center', borderTopWidth: 3, borderBottomWidth: 3, borderBottomColor: '#FAB549', borderTopColor: '#FAB549' }}>
                    <Text style={{ fontSize: 55, color: 'white', fontWeight:'bold' }}>
                        S<Text style={{fontSize:40,fontWeight:'bold'}}>ITTING</Text>
        </Text>
                    <Text style={{ fontSize: 50, color: 'white', fontWeight:'bold', marginBottom:10 }}>
                        P<Text style={{fontSize:40}}>LAN</Text>
        </Text>
                </View>
            </View>
        )

    }

    _retrieveData = async () => {

        try {
            const value = await AsyncStorage.getItem('uid');
            console.log('from async'+value)
            if (value != null) {
                this.props.navigation.navigate('MainStack')
            }
            else {
                this.props.navigation.navigate('Login')
            }
        } catch (error) {
            console.log('from async'+error)
        }
    }

}

const styles=StyleSheet.create({
   container:{
    flex:1,
    backgroundColor:'#455fa5'
   }
})