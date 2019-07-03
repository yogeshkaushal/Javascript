
import React, { Component } from 'react';
import { Text, View, Button, Image, StyleSheet } from 'react-native';
import { StackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';
import { FluidNavigator, Transition } from 'react-navigation-fluid-transitions'
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation'

  import Screen1 from './src/components/Screen1'
  import Screen2 from './src/components/Screen2'
import SignUp from './src/components/SignUp';
import SignUp2 from './src/components/SignUp2';
  

const Navigator = FluidNavigator({
  screen1: SignUp ,
  screen2: SignUp2 
});

export default createAppContainer(Navigator)

// export default class App extends Component{
//   render(){
//     return(
//       <View style={styles.father} >
//       <CubeNavigationHorizontal ref={view => { this.cube = view; }}>
//         <View style={[styles.container, { backgroundColor: '#5CDB8B' }]}>
//           <Text style={styles.text}>Horizontal Page 1</Text>
//         </View>
//         <View style={[styles.container, { backgroundColor: '#A3F989' }]}>
//           <Text style={styles.text}>Horizontal Page 2</Text>
//         </View>
//         <View style={[styles.container, { backgroundColor: '#CBF941' }]}>
//           <Text style={styles.text}>Horizontal Page 3</Text>
//         </View>
//       </CubeNavigationHorizontal>
//     </View >
//     )
//   }
// }

// const styles=StyleSheet.create({
  
// })