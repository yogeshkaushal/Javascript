import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer, } from 'react-navigation'
import LoginScreen from './src/loginScreen';
import MainScreen from './src/MainScreen';
import Office from './src/Office';
import AddOffice from './src/AddOffice';
import SittingManagement from './src/SittingManagement';
import LoadingScreen from './src/LoadingScreen';

const MainStack = createStackNavigator({
  Main: MainScreen,
  Office: Office,
  AddOffice: AddOffice,
  SittingManagement: SittingManagement
})

const AppNavigator = createSwitchNavigator({
  Loading: LoadingScreen,
  Login: LoginScreen,
  MainStack: MainStack
})
let Navigaion = createAppContainer(AppNavigator)
export default class App extends Component {
  render() {
    return (
      <Navigaion />
    );
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
