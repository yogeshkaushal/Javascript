import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    Image,

} from 'react-native';

import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import Foundation from 'react-native-vector-icons/Foundation'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Spinner from 'react-native-loading-spinner-overlay'


export default class AssignmentDetails extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)

        this.state = {
            getitem: [],
            buttonText: 'Submit',
            spinner: false,
            disabled: false

        }

    }

    componentWillMount() {

        console.log('Assignment Detail view')
        const { navigation } = this.props
        const item = this.props.navigation.getParam('item')

        this.setState({
            getitem: item
        })


    }

    componentDidMount() {
        this.onAssignmentStatusGet();
    }

    render() {




        const { getitem } = this.state

        return (

            <View style={styles.mainView}>

                <Spinner
                    visible={this.state.spinner}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />

                <ScrollView>
                    <View style={{
                        borderBottomWidth: 3,
                        borderBottomColor: '#E63B24',
                    }}>

                        <Text style={styles.textDetails}>Details</Text>
                    </View>
                    <View style={styles.AssignmentDetails}>

                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgray',
                            width: '100%',
                            alignSelf: 'center',
                            paddingBottom: 20
                        }}>
                            <View style={styles.usernameDeadline}>
                                <View style={{ flex: 1, justifyContent: 'center' }}>
                                    <Text style={styles.username}>{getitem.username}</Text>
                                </View>

                                <View style={styles.deadline}>
                                    <Text style={{ color: '#e8be33' }}>{getitem.deadline}</Text>
                                </View>
                            </View>




                            <Text style={styles.title}>{getitem.title}</Text>


                        </View>

                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 20,
                            marginTop: 20,
                            color: 'black'
                        }}>Description</Text>

                        <View style={styles.descriptionView}>
                            <Text style={styles.description}>{getitem.description}</Text>
                        </View>


                    </View>
                </ScrollView>
                <TouchableOpacity
                    disabled={this.state.disabled}
                    onPress={() => {
                        this.onSubmitAssignment()
                        this.setState({
                            spinner: true,
                            disabled: true
                        })
                    }}

                    style={{
                        width: '100%',
                        height: 45,
                        backgroundColor: this.backgroundColorChange(),
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: "bold",
                        fontSize: 18
                    }}>
                        {this.state.buttonText}
                    </Text>
                </TouchableOpacity>

            </View>


        )
    }

    onSubmitAssignment() {
        firebase.firestore().collection('submittedBy').add({

            assignmentId: this.state.getitem.assignmentId,
            uId: this.state.getitem.uId
        })
            .then(res => {
                this.setState({
                    buttonText: 'Completed',
                    spinner: false
                }),
                    this.backgroundColorChange();
            })
            .catch((error) => {
                alert(error)
            })
        console.log(this.state.getitem.assignmentId + ' ' + this.state.getitem.uId)
    }

    backgroundColorChange = () => {
        let color = 'green'

        if (this.state.buttonText == 'Completed') {
            color = 'grey'
        }
        return color;
    }

    onAssignmentStatusGet = () => {

        console.log(this.state.getitem.uId + ' ' + this.state.getitem.assignmentId)
        firebase.firestore().collection('submittedBy')
         .where('assignmentId', '==', this.state.getitem.assignmentId)
            .get()
            .then(querySnapshot => {
        
                querySnapshot.forEach(doc => {
                   console.log('firebase assignment')
                   this.setState({
                       buttonText: 'Completed',
                       disabled: true
                   })
                   this.backgroundColorChange();
                })
               
            })
            .catch((error) => {
                console.log(error)
            })

    }
}

const styles = StyleSheet.create({

    mainView: {
        flex: 1,
    },
    textDetails: {
        padding: 20,
        fontSize: 34,
        fontWeight: 'bold',
        color: 'black'
    },
    AssignmentDetails: {
        flex: 1,
        backgroundColor: 'white',
        padding: 22,
        width: '95%',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 7
    },
    username: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#696969',
    },
    title: {
        color: '#2D596D',
        fontSize: 26,
        marginTop: 20,
        fontWeight: 'bold',

    },
    deadline: {
        borderWidth: 1,
        borderColor: '#e8be33',
        width: '35%',
        borderRadius: 20,
        padding: 7,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'center'
    },
    usernameDeadline: {
        flexDirection: 'row',
    },
    description: {
        color: 'black',
        marginTop: 20,
        fontSize: 15
    },
    spinnerTextStyle: {
        color: '#FFF'
    },

})