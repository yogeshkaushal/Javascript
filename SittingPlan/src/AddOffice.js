import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard,TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase'


export default class AddOffice extends Component {
   addItemArray = this.props.navigation.getParam('addItemArray');
   editItemArray = this.props.navigation.getParam('editItemArray');

  static navigationOptions = {
    title: ' ',
    headerStyle: {
      backgroundColor: '#184755',
    }, 
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize:25
    },
  }
  state = {
    name: '',
    seats: '',
    btnName:'',
    disabled:true,
    array:[]
  }
  componentDidMount(){
    const { navigation } = this.props;
    const itemData = navigation.getParam('itemData');
    const itemIndex = navigation.getParam('itemIndex');
    const btnName = navigation.getParam('btnName')
    const companyAraay = navigation.getParam('companyAraay')
    const addItemArray = navigation.getParam('addItemArray');
    const editItemArray = navigation.getParam('editItemArray');
    this.setState({
        index: itemIndex,
        btnName: btnName,
        name:itemData.officeName,
        seats:itemData.seats,
        defaultText: itemData,
        array:companyAraay


    })
  }


  render() {
    const { navigation } = this.props;
    const addItemArray = navigation.getParam('addItemArray');
    const editItemArray = navigation.getParam('editItemArray');

    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
        
         <Text style={styles.text}>Enter Office Details</Text>

          <TextInput
            placeholder='Enter Office Name'
            style={styles.titleTxtInput}
            keyboardType='email-address'
            value={this.state.name}
            onChangeText={(text) => {
              this.setState({ 
                name: text ,
              })
            }}
          />
            <TextInput
              placeholder='Select number of Seats'
              keyboardType='number-pad'
              value={this.state.seats}
              style={styles.titleTxtInput}
              onChangeText={(text) => {
                this.setState({ 
                  seats: text,
                })
              }}
            />
           <TouchableOpacity style={styles.btnMain} 
          //  disabled={this.state.disabled}
           onPress={()=>{
                if (!this.state.name && !this.state.seats ) {
                  Alert.alert(
                    'Empty Field',
                    'One of you field is empty enter some text to Continue'
                )
                   
                } else {
                    if (this.state.btnName == 'Done') { 
                      // addItemArray(this.state.name,this.state.seats)
                      // this.props.navigation.goBack()
                      // this.addPostFireBase(this.state.name, this.state.seats)
                      this.validateDuplicasy(this.state.name,this.state.seats)
                      }else if(this.state.btnName =='UPDATE'){
                          editItemArray(this.state.name,this.state.seats)
                          this.props.navigation.goBack()
                          this.updateFirebase(this.state.name,this.state.seats)
                      }
              
                }}
            
            }>
                <Text style={{fontSize:17,fontWeight:'bold',color:'white'}}>{this.state.btnName}</Text>   
            </TouchableOpacity> 
        </View>
      </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );
  }

  validateDuplicasy = (name, seats) => {
    let userArray = this.state.array
    let userNum = userArray.length
    if (userNum == 0) {
        // this.addItemArray(name, seatNum)
                  this.addItemArray(name,seats)
                    this.props.navigation.goBack()
                    this.addPostFireBase(name,seats)
    } else {
        for (let i = 0; i <= userNum - 1; i++) {
            if (userArray[i].officeName === name) {
                Alert.alert(
                    'Name is already Taken',
                    "Choose another one"
                )
                break
            } else if (i == userNum - 1) {
              this.addItemArray(name,seats)
              this.props.navigation.goBack()
              this.addPostFireBase(name,seats)
            }
        }
    }
}

  onBtnPressed = () => {
    Keyboard.dismiss();
  }


  addPostFireBase = (name,seats) => {
    firebase.firestore().collection("offices").add({
      officeName:name,
      seats:seats,
    })
      .then((docRef) => {
       

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  }

updateFirebase = (name,seats) => {
    firebase.firestore().collection("offices").where("officeName", "==", this.state.defaultText.officeName).get()
        .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
                doc.ref.update({
                    officeName:name,
                    seats:seats

                })
            });
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });



}
}
const styles = StyleSheet.create({
  container: {
    width:'90%',
    height:500,
    elevation:12,
    marginTop:'15%',
    marginLeft:'5%',
    marginRight:'5%',
    marginBottom:'10%',
    backgroundColor: 'white',
    alignItems:"center",
    borderRadius:10,

    

  },
  titleTxtInput: {
    fontSize: 18,
    width:'80%',
    borderBottomWidth:1,
    paddingLeft: "4%",
    padding:10,
    marginTop:30,
    color: 'black',
    fontWeight: 'bold',
    borderRadius:10
  },
  text: {
    fontSize: 27,
    fontWeight: 'bold',
    color:'black',
    marginTop:100
},
btnMain:{
    width:'70%',
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#184755',
    marginTop:60,
    borderRadius:20,
}

});