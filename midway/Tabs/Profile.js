import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image,Alert ,ScrollView, AsyncStorage,RefreshControl } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



class newProfile extends Component {

    static navigationOptions = {
        header: null,
        


        tabBarIcon: ({ focused, tintColor }) => {
            return <FontAwesome5 name='user' size={25}  />
        },
        tabBarOptions: {
           
            inactiveBackgroundColor: '#EFEFEF',
            activeTintColor: 'blue',
            
            
          },
    }

    constructor(props) {
        super(props)

        this.state = {
            photo: '',
            Username: '',
            phoneNo: '',
            name: '',
            Gender: '',
            pictureUrl:''
        }
    }

    componentDidMount(){
        const ref = firebase.storage().ref(this.props.uid)
       ref.getDownloadURL()
       .then(res=>{
           this.setState({
               pictureUrl:res
           })
       })
       .catch((error)=>{
           console.log(error)
       })
    }

    async removeItemValue(key) {
        try {
            console.log('in remove Item async')
          await AsyncStorage.removeItem(key);
          return true;
        }
        catch(exception) {
          
          console.log(exception)
          return false;
        }
      }

    onEditProfile() {
        this.props.navigation.navigate('ProfileDetails',{imageUrl : this.state.pictureUrl})
    }

    logout = () => {
        console.log('on Logout mathod 1')
        firebase.auth().signOut()
            .then(() => {
                console.log('on Logout mathod 2'),
                this.removeItemValue('uid')
                    this.props.navigation.navigate('Login')
            }

            )
            .catch((error) => { console.log('error from logout ' + error) })

    }



    deleteToken = () => {
        console.log('Uid from Dlete token is ' + this.props.uid)
        firebase.firestore().collection('students').where('uId', '==', this.props.uid)
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(function (doc) {
                    console.table(doc.data())
                    doc.ref.update({
                        token: firebase.firestore.FieldValue.delete()
                    })
                })

            })
            .then(
                res => this.logout()
            )
            .catch((error) => console.log(error))

    }


    

    render() {
        const { photo } = this.state;


        return (

            <View style={styles.MainView}>

                <View style={{
                    borderBottomWidth: 3,
                    borderBottomColor: '#E63B24'

                }}>
                    <Text style={styles.textProfile}>Profile</Text>
                </View>
                
                    <View style={styles.ImageView}>

                       
                            <Image
                                style={{
                                    width: 100,
                                    height: 100,
                                    borderWidth: 0.7,
                                    backgroundColor: 'black',
                                    borderColor: 'lightgrey',
                                    borderRadius: 360
                                }}
                                
                                source={{uri:this.state.pictureUrl}}

                            ></Image>
                          

                        <View style={styles.nameEmail}>
                            <Text style={styles.Username}>
                                {this.props.username}
                            </Text>
                            <Text style={styles.email}>
                                {this.props.email}
                            </Text>
                            <TouchableOpacity onPress={() => {
                                this.onEditProfile()
                            }

                            }>
                                <Text style={{
                                    color: 'blue',
                                    marginTop: 5,
                                }}>
                                    Edit
                              </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.InfoView}>
                            <Text style={styles.InfoText}>
                                Username
                            </Text>

                            <Text style={styles.InfoText}>
                                phone no.
                            </Text>
                            <Text style={styles.InfoText}>
                                Gender
                            </Text>
                            
                        </View>

                        <View style={styles.InfoTextInputView}>
                            <Text style={styles.InfoTextInput}>
                                {this.props.username}
                            </Text>
                            <Text style={styles.InfoTextInput}>
                                {this.props.phone}
                            </Text>
                            <Text style={styles.InfoTextInput}>
                                {this.props.gender}
                            </Text>
                        </View>


                    </View>
                    <TouchableOpacity style={styles.TouchableLogin}
                        onPress={() =>Alert.alert(
                            'Logout',
                            'Are you sure?',
                            [
                              {
                                text: 'Cancel',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                              },
                              {text: 'Logout', onPress: () => this.deleteToken() },
                            ],
                            {cancelable: false},
                            style={backgroundColor:'red'}
                          )
                            


                        }>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: 'white',
                        }}>
                            Logout
                        </Text>
                    </TouchableOpacity>


              
            </View>

        )
    }
}

function mapStateToProps(state) {
    return {
        username: state.username,
        email: state.email,
        uid: state.uid,
        gender: state.gender,
        phone: state.phoneno
    }
}


export default connect(mapStateToProps)(newProfile)

connect(mapStateToProps)(newProfile)
const styles = StyleSheet.create({

    MainView: {
        flex: 1,
    },
    ImageView: {
        padding: 25,
        flexDirection: 'row',
        borderBottomWidth: .5

    },
    Username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'

    },
    email: {
        color: 'black',
        fontWeight: 'bold',
        marginTop: 5,
        opacity: 0.5
    },
    nameEmail: {
        marginLeft: 20,
        justifyContent: 'center'
    },
    InfoView: {
        top: 50
    },
    InfoText: {
        padding: 25,
        fontSize: 13
    },
    InfoTextInputView: {
        top: 50
    },
    InfoTextInput: {
        padding: 22,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
        opacity: 0.8
    },
    TouchableLogin: {
        backgroundColor: '#5ed6bf',
        height: 50,
        width: '70%',
        marginTop: 70,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        elevation: 4
    },
    textProfile: {
        padding: 20,
        fontSize: 34,
        fontWeight: 'bold',
        color: 'black'
    }

})