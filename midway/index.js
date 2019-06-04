/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SignupScreen from './src/SignUpScreen';
import LoginScreen from './src/LoginScreen';
import MainScreen from './src/MainScreen';
import MainView from './src/MainView'
import AssignmentStudent from './Tabs/AssignmentStudent';
import Profile from './Tabs/Profile'
import profileDetails from './src/ProfileDetails'
import AssignmentDetails from './src/AssignmentDetails';
import Feed from './Tabs/Feed';
import AddPost from './src/AddPost';
import TestingFile from './src/TestingFile'


AppRegistry.registerComponent(appName, () => App);
