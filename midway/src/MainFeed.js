// import React, {Component} from 'react';
// import {Platform, StyleSheet, Text, View,Image} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import { createStackNavigator, createAppContainer } from 'react-navigation';
// import AddPost from './AddPost';
// import Feed from '../Tabs/Feed';

// const Tabs = createStackNavigator({
//   Feed:Feed,
 
// }
// )
// let TabView = createAppContainer(Tabs)

// export default class NewsFeed extends Component {

//   static navigationOptions = {

//     header:null,

//     tabBarIcon: (focused, tintColor) => (
//       <AntDesign name="home" size={27} color='#6d6d72' />
//     ),
//     tabBarLabel:() => {return null},
//  }
//   render() {
//     return (
//      <TabView />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },

// });