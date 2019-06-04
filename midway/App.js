

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import firebase from 'react-native-firebase'
import { createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation'
import FirstScreen from './src/FirstScreen'
import LoginScreen from './src/LoginScreen'
import SignUpScreen from './src/SignUpScreen' 
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducer from './src/Reducer'
import AddPost from './src/AddPost';
import AssignmentStudent from './Tabs/AssignmentStudent';
import Profile from './Tabs/Profile';
import AssignmentDetails from './src/AssignmentDetails';
import ProfileDetails from './src/ProfileDetails';
import Feed from './Tabs/Feed';
import LoadingScreen from './src/LoadingScreen';

const Store = createStore(Reducer)

const getUserStack  = createStackNavigator({
  Screen: FirstScreen,
  Login: LoginScreen,
  SignUp: SignUpScreen,

})

const bottomTabStack = createBottomTabNavigator({
  Feed:Feed,
  Assignment:AssignmentStudent,
  Profile:Profile,
  
},{
  headerMode: 'float',
  navigationOptions:({navigation}) => ({
    header: null,
    activeTintColor:'red'
  }),


})

const innerStack = createStackNavigator({
  bottomTabStack : bottomTabStack,
  ProfileDetails:ProfileDetails,
  AssignmentDetails : AssignmentDetails,
  AddPost:AddPost

})


const AppNavigator = createSwitchNavigator({
  Screen:LoadingScreen,
  getUserStack:getUserStack,
  innerStack:innerStack
})






let Nav = createAppContainer(AppNavigator);

export default class App extends Component {

  async createNotificationListeners() {
    console.log('createNotificatinListner')
        const channel = new firebase.notifications.Android.Channel('test-channel',
         'Test Channel', firebase.notifications.Android.Importance.Max)
          .setDescription('My Apps test channel');
    
        await firebase.notifications().android.createChannel(channel)
        console.log('notificatinListner')
    
        this.notificationListeners = firebase.notifications().onNotification((notif) => {
          console.log(notif.title)
          const notification = new firebase.notifications.Notification()
          .setNotificationId('notificationId')
          .setTitle(notif.title)
          .setBody(notif.body)
          .setData(notif.data);
          notification.android.setChannelId('test-channel')
          firebase.notifications().displayNotification(notification)
        }) 
      }
      
        async componentDidMount() {
    
        this.createNotificationListeners();
      }
    
      componentWillUnmount() {
        
        this.notificationListeners()
    
      }
    
    

  render() {
    return (
      <Provider store={Store}>
        <Nav />
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
