
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
    {
      key: 'somethun',
      title: 'Title 1',
      text: 'Description.\nSay something cool',
      image: require('../images/walkthrough1.jpg'),
      backgroundColor: '#59b2ab',
    },
    {
      key: 'somethun-dos',
      title: 'Title 2',
      text: 'Other cool stuff',
      image: require('../images/Walkthrough2.jpg'),
      backgroundColor: '#febe29',
    },
    {
      key: 'somethun1',
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../images/Walkthrough2.jpg'),
      backgroundColor: '#22bcb5',
    },
    {
      key: 'somethun2',
      title: 'Rocket guy',
      text: 'I\'m already out of descriptions\n\nLorem ipsum bla bla bla',
      image: require('../images/Walkthrough2.jpg'),
      backgroundColor: '#22bcb5',
    }
  ];  
  
  _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={style.text}>{item.text}</Text>
      </View>
    );
  }
  
  _onDone = () => {
   
    this.setState({ showRealApp: true });
    
  }
  
  export default class walkthrough extends Component {
  
    state = {
      showRealApp: false
    }
  
    render() {
      
        if (this.state.showRealApp) {
          return <App />;
        } else {
          return <AppIntroSlider renderItem={this._renderItem} slides={slides} onDone={this._onDone}/>;
        }
      
    }
  }
  