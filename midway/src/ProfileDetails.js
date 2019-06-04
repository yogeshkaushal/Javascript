import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { AsyncStorage } from 'react-native'


class ProfileDetails extends Component {


static navigationOptions={

    // header:null
}

constructor(props) {
    super(props)

    this.state = {

        photo: '',
        Username: '',
        phoneNo: '',
        Name: '',
        Gender: '',
        Email:'',
        Uid:'',
        pictureUrl:''
    }
}


    componentWillMount(){

        const imageUrl = this.props.navigation.getParam('imageUrl')
        console.log('image url is'+imageUrl)

        this.setState({
            Username: this.props.Username,
            phoneNo: this.props.phoneno,
            Name: this.props.Name,
            Gender: this.props.Gender,
            Email:this.props.Email,
            Uid:this.props.Uid,
            pictureUrl:imageUrl
        })
        
    }

    onUpdatePress(){
        console.log("uid is"+this.props.Uid)

     
        firebase.firestore().collection('students').where('uId','==',this.props.Uid)
        .get()
        .then(querySnapshot =>{
            querySnapshot.forEach((doc)=>{
                doc.ref.update({
                    username:this.state.Username,
                    gender:this.state.Gender,
                    phoneNo:this.state.phoneNo,
                })
                 this.props.updateDataProps(this.state.Username,
                                            this.state.Gender,
                                            this.state.phoneNo,
                                            this.state.Uid,
                                            this.state.Email)

                  this.props.navigation.goBack()
            })
        })
        .catch((error)=>{
              console.log(error)
        })
        
    }

    choosePhoto = () => {
        const options = {
            title: 'Select Option',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = response.uri;
                this.setState({
                    photo: source,
                });
                this.uploadImageFirebase(response.uri)
            }
        });
    }

    uploadImageFirebase = (uri) => {
 
        const ref = firebase.storage().ref(this.props.Uid)
        ref.putFile(uri)
        .then(function (snapshot) {
            console.log('file uploaded')
        })
        .catch((error)=>{
            console.log(" err is "+error.message)
        })
    }
    

   
    render() {

        const { photo } = this.state;

        return (
            <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1, }}
                                     keyboardShouldPersistTaps='always'
                                     resetScrollToCoords={{ x: 0, y: 0 }}>

                <View style={styles.mainView}>
                    <View style={styles.imageView}>
                    <TouchableOpacity onPress={()=>this.choosePhoto()}>
                        <Image source={{uri:this.state.pictureUrl}}
                            style={{
                                width: 150,
                                height: 150,
                                borderWidth: 0.7,
                                backgroundColor: 'gray',
                                borderColor: 'lightgrey',
                                borderRadius: 360
                            }}
                        />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.DetailsView}>

                        <Text style={{
                            fontSize: 24,
                            fontWeight: 'bold',
                            padding: 20,
                            color: 'black'
                        }}>Personal Details
                            </Text>

                        <View style={styles.TextInput} >
                            <AntDesign name='user' size={22} style={{
                                paddingTop: 12,
                                paddingLeft: 10
                            }} />

                            <TextInput placeholder='Username'
                                       value={this.state.Username}
                                       onChangeText={(text)=>this.setState({
                                           Username:text
                                       })}
                                style={{
                                    fontSize: 17,
                                    paddingLeft: 8
                                }} />

                        </View>

                        <View style={styles.TextInput} >
                            <FontAwesome5 name='male' size={22} style={{
                                paddingTop: 12,
                                paddingLeft: 16
                            }} />

                            <TextInput placeholder='Gender'
                                       value={this.state.Gender}
                                       onChangeText={(text)=>this.setState({
                                        Gender:text
                                    })}
                                style={{
                                    fontSize: 17,
                                    paddingLeft: 10
                                }} />

                        </View>

                        <View style={styles.TextInput} >
                            <FontAwesome name='mobile-phone' size={25} style={{
                                paddingTop: 12,
                                paddingLeft: 15,
                            }} />

                            <TextInput placeholder='Phone No.'
                                       value={this.state.phoneNo}
                                       onChangeText={(text)=>this.setState({
                                        phoneNo:text
                                    })}
                                style={{
                                    fontSize: 17,
                                    paddingLeft: 10
                                }} />

                        </View>
                        <TouchableOpacity onPress={() => this.onUpdatePress()}
                        style={styles.TouchableLogin}>
                        <Text style={{
                            fontSize: 17,
                            fontWeight: '500',
                            color: 'white',
                        }}>
                            Update
                        </Text>
                    </TouchableOpacity>

                    </View>

                    

                </View>
            </KeyboardAwareScrollView>

        )
    }
}

function mapStateToProps(state) {
    return {
        Name: state.name,
        Email: state.email,
        Username: state.username,
        phoneno: state.phoneno,
        Gender: state.gender,
        Uid:state.uid
    }
}
function mapDispatchToprops(dispatch) {
    return {
        updateDataProps: (username, gender, phoneNo, uid, email) => dispatch({

            type: 'UPDATE_DATA',

            username,
            phoneNo,
            gender,
            uid,
            email
        })

    }

}

export default connect(mapStateToProps, mapDispatchToprops)(ProfileDetails)


const styles = StyleSheet.create({

    mainView: {
        flex: 1,
    },
    imageView: {
        height: 200,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.3
    },
    DetailsView: {
        flex: 2,
        backgroundColor:'white'
    },
    TextInput: {
        flexDirection: 'row',
        width: '90%',
        padding: 2,
        borderRadius: 10,
        marginTop: 15,
        alignSelf: 'center',
        backgroundColor: '#DCDCDC',

    },
    TouchableLogin: {
        backgroundColor: '#2D596D',
        height: 50,
        width: '70%',
        marginTop:30,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        elevation: 4
    },

})