import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Entypo from 'react-native-vector-icons/Entypo'
import FeedList from '../src/FeedList'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'


export default class Feed extends Component {
    static navigationOptions = {

        header: null,

        tabBarIcon: (tintColor) => {
            return <AntDesign name="home" size={27} color="#2D596D" />
        },
        tabBarOptions: {

            inactiveBackgroundColor: '#EFEFEF',
            activeTintColor: 'blue',

        },
    }
    state = {
        array: [],
        dataLoaded: false,
        refreshing: false
    }

    componentDidMount() {

        this.getDataFirebase()
    }

    getDataFirebase = () => {
        firebase.firestore().collection('posts').get()
            .then((querySnapshot) => {
                let arr = []
                querySnapshot.forEach((doc) => {

                    arr = [...arr, doc.data()]

                });

                this.setState({
                    array: [...arr],
                    dataLoaded: true
                })
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    _onRefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.getDataFirebase(),
                this.setState({ refreshing: false })
        });
        ;
    }

    ListEmptyView = () => {

        if (this.state.dataLoaded == true) {
                                
            if (this.state.array.length == 0) {
                console.log(this.state.array.length)
                return (

                    <View>
                        <Text>No items in FlatList</Text>
                    </View>

                )

            }
            else {
                return (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator size='large' ></ActivityIndicator>
                    </View>
                )

            }
            
        }

    }


    render() {
        return (
            <View style={styles.container}>

                <View style={{
                    flex: 1,
                    borderBottomWidth: 3,
                    borderBottomColor: '#E63B24',
                    flexDirection: 'row'

                }}>
                    <View>
                        <Text style={styles.textFeed}>Feed</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddPost')}>
                            <Entypo style={{
                                paddingRight: 20
                            }} name='new-message' size={30} color='#2D596D' />
                        </TouchableOpacity>
                    </View>


                </View>

                <View style={styles.bottomList}>
                    <FlatList ListEmptyComponent={this.ListEmptyView()}
                        style={{ flexGrow: 0 }}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                        data={this.state.array}

                        renderItem={({ item, index }) => {


                            return (

                                <FeedList item={item} />

                            )

                        }}

                        
                                
                        

                    ></FlatList>
                </View>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    bottomList: {
        flex: 6,
    },
    textFeed: {
        padding: 20,
        flex: 1,
        fontSize: 34,
        fontWeight: 'bold',
        color: 'black'
    }

});