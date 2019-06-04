import React, {Component} from 'react';
import { StyleSheet, Text, View,ImageBackground,TouchableOpacity} from 'react-native';
import firebase from 'react-native-firebase'
import {AsyncStorage} from 'react-native'

export default class FirstScreen extends Component {

  static navigationOptions = {
    header: null
};

// componentWillMount(){
//     this._retrieveData();
// }

// _retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('uid');
//     if (value !== null) {
//       this.props.navigation.navigate('MainScreen')
//     }
//   } catch (error) {
//       alert('error retrieving data')
//   }
// };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headView}>
            <ImageBackground
             source={{uri:'http://images6.fanpop.com/image/photos/34100000/Library-reading-34119713-999-1024.jpg'}}
             style={{
                 flex:1,
                 alignItems:'center',
                }}
             >
             <View style={styles.overLay}/>
            <Text style={styles.headMain}>
                MidWay
            </Text>
            <Text style={styles.headText}>
                Best way to connect Teacher and Students
            </Text>
            </ImageBackground>
        </View>
        <View style={styles.bottomView}>
         <TouchableOpacity  onPress={()=>this.props.navigation.navigate('Login')}
            style={{
                width:'80%',
                backgroundColor:'#2D596D',
                alignItems:'center',
                justifyContent:'center',
                height:50,
                borderRadius:40
            }}
            >
                <Text 
                style={{
                    fontSize:17,
                    fontWeight:'bold',
                    color:'white'
                }}
                >Sign In</Text>    
            </TouchableOpacity> 
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}
            style={{
                width:'80%',
                height:50,
                alignItems:'center',
                justifyContent:'center',
                top:20,
                borderRadius:40,
                borderColor:'#2D596D',
                borderWidth:1
            }}
            >
                <Text style={{
                    fontSize:17,
                    fontWeight:'bold',
                    color:'#2D596D'
                }}>create account</Text>    
            </TouchableOpacity> 
            
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headView:{
    height:'65%',
    width:'100%', 
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    backgroundColor:'#56c9c8',
  },
  bottomView:{
    height:'35%',
    width:'90%',
    top:'57%',
    margin:20,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
    position:'absolute',
    borderRadius:10,
    
    
    shadowColor:'#dedede',
    shadowOffset:{width:10,height:10},
    shadowOpacity:1,
    shadowRadius:10,
    elevation:12

  },
  headMain:{
    fontSize:50,
    marginTop:200,
    fontWeight:'bold',
    color:'white'
  },
  headText:{
    color:'#dedede',
    fontWeight:'bold',
    marginTop:10
  },
  overLay:{
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,.6)'
  }
})