import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Alert,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import Foundation from 'react-native-vector-icons/Foundation'
import firebase from 'react-native-firebase';
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class AssignmentStudent extends Component {


    static navigationOptions = {

        tabBarIcon: ({ focused, tintColor }) => {
            return <Foundation name='clipboard-notes' size={25} color='#2D596D' />
        },
        tabBarOptions: {

            inactiveBackgroundColor: '#EFEFEF',
            activeTintColor: 'blue',

        },
        header: null

    }

    constructor(props) {
        super(props)

        this.state = {
            array: [],
            dataLoaded: 'false',
            refreshing: false,

        }
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.fetchData(),
                this.setState({ refreshing: false })
        });
        ;
    }

    onAssignmentClicked = (item, index) => {

        this.props.navigation.navigate('AssignmentDetails',
            {
                item: this.state.array[index]
            })
        console.log(this.state.array[index])
    }

    fetchData = () => {

        firebase.firestore().collection('assignments')
            .get()
            .then((querySnapshot) => {
                let arr = [];
                querySnapshot.forEach(function (doc) {
                    a = doc.data()
                    arr = [...arr, a]

                })

                this.setState({
                    array: arr,
                    dataLoaded: 'true'
                })

            })

    }

    componentWillMount() {
        this.fetchData();
    }



    render() {

        let colors = ['#E8DBD3', '#D6D6D6', '#DA6443'];

        if (this.state.dataLoaded == 'false') {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'
                }}>
                    <ActivityIndicator size='large' ></ActivityIndicator>
                </View>
            )
        }
        else {
            return (
                <View style={styles.mainView}>

                    <View style={{
                        borderBottomWidth: 3,
                        borderBottomColor: '#E63B24'

                    }}>
                        <Text style={styles.textAssignment}>Assignments</Text>
                    </View>



                    <FlatList refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                        data={this.state.array}
                        renderItem={({ item, index }) => {
                            console.table(item)
                            return (
                                <TouchableOpacity onPress={() =>

                                    this.onAssignmentClicked(item, index)
                                }>

                                <View style={{
                                    // backgroundColor: colors[index % colors.length],
                                    backgroundColor:'#E6E6FA',
                                    height: 200,
                                    marginTop:10,
                                    width:'95%',
                                    alignSelf:'center',
                                    borderRadius:10,
                                    borderWidth:0.5,
                                    borderColor:'lightgrey',
                                    elevation:2

                                }}>
                                    <View style={{ flex: 6 }}>
                                        <Text numberOfLines={1} style={styles.Username}>By {item.username}</Text>
                                        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                                        <Text numberOfLines={2} style={styles.Description}>{item.description}</Text>

                                    </View>
                                    <View style={styles.Viewdeadline}>
                                    <View  style={{ flex: 1,}}>
                                       <Text style={{fontWeight:'bold'}}>Deadline</Text>
                                    </View>

                                       <View style={{ flex: 1, alignItems:'flex-end'}}>
                                       <Text numberOfLines={1} style={styles.deadline}>{item.deadline}</Text>
                                       </View>
                                        

                                    </View>
                                </View>



                                </TouchableOpacity>
                            )
                        }}>

                    </FlatList>
                </View>


            )
        }
    }
}
const styles = StyleSheet.create({

    mainView: {
        flex: 1,
    },
    Username: {
        padding: 12,
        fontSize: 15,
        fontWeight: 'bold',
        color: '#2D596D'
    },
    title: {
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        paddingLeft: 12
    },
    Description: {
        padding: 12,
        fontWeight: 'bold'

    },
    Viewdeadline: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '85%',
        bottom: 10,
        borderTopWidth: 1,
    },
    deadline: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15

    },
    textAssignment: {
        padding: 20,
        fontSize: 34,
        fontWeight: 'bold',
        color: 'black'
    }
})
