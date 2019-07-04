import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { OfficeList } from './Component'

export default class Office extends Component {

  static navigationOptions = {
    title: 'Office',
    headerStyle: {
      backgroundColor: '#184755',
    },
    headerTintColor: 'white',
  }

  state = {
    array: [],
    refreshing: false,
    index: ''
  }

  componentDidMount() {
    this.getDataFirebase()
  }

  render() {

    if (this.state.refreshing) {
      return (
        <View style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color="#184755" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
        {/* <View style={styles.header}> */}
        <FlatList
          style={{ flex: 1 }}
          data={this.state.array}
          // ListEmptyComponent={this.renderFooter}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
          renderItem={({ item, index }) => {
            return (
              <OfficeList
                item={item}
                index={index}
                onPress={() => this.onPressDelete(item, index)}
                onPressEdit={() => this._onPressItem(item, index)}
              />
            )
          }}

        >
        </FlatList>
        {/* </View> */}

        <View style={styles.btmContainer}>
          <TouchableOpacity
            style={{ elevation: 10 }}
            onPress={() =>
              this.props.navigation.navigate('AddOffice', {
                addItemArray: this.addItemArray.bind(this),
                btnName: 'Done',
                itemData: "",
                companyAraay: this.state.array
              })}
          >
            <Ionicons name="ios-add-circle" size={70} color='#184755' />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _onRefresh = () => {
    this.setState({ refreshing: true }, () => {
      this.getDataFirebase(),
        this.setState({ refreshing: false })
    });
    ;
  }

  getDataFirebase = () => {
    this.setState({ refreshing: true })
    firebase.firestore().collection('offices').get()
      .then((querySnapshot) => {

        let arr = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          arr = [...arr, doc.data()]
        });
        this.setState({
          array: [...arr],
          refreshing: false
        })
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  onPressDelete = (item, index) => {
    Alert.alert(
      '',
      'Would you like to delete this Office',
      [
        {
          text: 'Delete', style: 'destructive', onPress: () => {
            this.deleteItem(item)
            this.deleteItemArray(index)
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

  renderFooter = () => {
    if (this.state.array.length != 0) return null;

    return (
      <View style={{
        backgroundColor: 'white',
        marginTop: '50%',
        alignItems: 'center'
      }}>
        <Text style={styles.text}>Click on + to add Office</Text>
      </View>)

  }

  addItemArray = (name, seats) => {
    let arr = { officeName: name, seats: seats }
    this.setState({
      array: [...this.state.array, arr]
    })
  }

  deleteItemArray = (index) => {
    const list = this.state.array
    list.splice(index, 1)
    this.setState({
      array: list
    })
  }

  editItemArray = (name, seats) => {
    let item = { officeName: name, seats: seats }
    const editarr = this.state.array
    const editIndex = this.state.index
    editarr.splice(editIndex, 1)
    editarr.splice(editIndex, 0, item)
    this.setState({
      array: editarr

    })
  }


  _onPressItem = (item, index) => {

    this.setState({
      index: index
    })
    this.props.navigation.navigate('AddOffice', {
      itemData: item,
      itemIndex: index,
      btnName: 'UPDATE',
      editItemArray: this.editItemArray.bind(this),


    })

  }
  deleteItem = item => {

    firebase.firestore().collection("offices").where("officeName", "==", item.officeName).get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id, " => ", doc.data());
          doc.ref.delete()

        });

      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });

  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
  },
  btmContainer: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 7
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  }

});