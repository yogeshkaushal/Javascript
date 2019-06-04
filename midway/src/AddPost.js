import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay'


export default class AddPost extends Component {

  static navigationOptions = {
    header: null
  }

  state = {
    title: '',
    postData: '',
    spinner: false
  }


  addPostFireBase = (title, postData) => {
    if (title.length != 0 && postData.length != 0) {
      firebase.firestore().collection("posts").add({
        uId: this.props.uId,
        username: this.props.username,
        title: title,
        post: postData
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.setState({
            spinner:false
          })
          this.props.navigation.goBack()
        })
        .catch((error) => {
          this.setState({
            spinner:false
          })
          console.error(error);
        });
    }
    else {
      
      this.setState({
        spinner:false
    })
     
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <View style={styles.container}>

          <Spinner visible={this.state.spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />



          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.textPost}>Post</Text>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row-reverse',
              alignItems: 'center',

            }}>
              <TouchableOpacity >
                <Text onPress={() => {
                      this.addPostFireBase(this.state.title, this.state.postData)
                      this.setState({
                        dataLoaded: 'true',
                        spinner:true
                    })
                }}
                  style={styles.postButton}>
                  Post
                </Text>
              </TouchableOpacity>

            </View>


          </View>



          <TextInput placeholder='Title'
            style={styles.titleTxtInput}

            onChangeText={(text) => {
              this.setState({
                title: text
              })
            }}
          />

          <View style={styles.bottomContainer}>
            <TextInput placeholder='Compose Post'
              multiline={true}
              style={styles.postData}
              onChangeText={(text) => {
                this.setState({ postData: text })
              }}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const mapStateToProps = state => {
  return {
    uId: state.uid,
    username: state.username
  }
}


connect(mapStateToProps)(AddPost);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',

  },
  titleTxtInput: {
    fontSize: 18,
    borderBottomColor: 'grey',
    paddingLeft: "4%",
    color: 'black',
    fontWeight: 'bold',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  postData: {
    fontSize: 17,
    paddingLeft: "4%",
    color: 'black',

  },
  bottomContainer: {
    flex: 4,
  },
  btnContainer: {
    alignItems: 'flex-end',
    margin: '5%'
  },
  textPost: {
    padding: 20,
    fontSize: 34,
    fontWeight: 'bold',
    color: 'black'
  },
  spinnerTextStyle:{
    color: '#FFF'
  },
  postButton: {
    backgroundColor: 'blue',
    color: 'white',
    padding: 8,
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 20,
    fontWeight: 'bold',
    borderRadius: 6,
  }

});