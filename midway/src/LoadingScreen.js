import React, { Component } from 'react'
import { View, Text, ActivityIndicator, AsyncStorage } from 'react-native'
import { connect } from 'react-redux'
import firebase from 'react-native-firebase'

class LoadingScreen extends Component {

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


        }
    }

    componentWillMount() {

        this._retrieveData();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
                <ActivityIndicator size='large' color='red'></ActivityIndicator>
            </View>
        )

    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('uid');
            console.log('from async'+value)
            if (value !== null) {
                this.fetchData(value)
                this.props.navigation.navigate('innerStack')
            }
            else {
                this.props.navigation.navigate('Login')
            }
        } catch (error) {
            console.log('from async'+error)
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

                    this.props.setData(a.username, a.phoneNo, a.gender, a.email, Uid)
                    console.log(a.username + a.gender, a.phoneNo + a.email)

                })
            })
            .catch(error => {
                console.log(error)

            })

    }

}
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

export default connect(mapStateToProps, mapDispatchToprops)(LoadingScreen)
