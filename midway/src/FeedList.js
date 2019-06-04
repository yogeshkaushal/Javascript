import React from 'react'
import { View, Image, Text, StyleSheet } from 'react-native'

export default (props) => {
    return (
        <View style={styles.containerList}>
            <View style={styles.profileContainer}>
                <Image source={{ uri: 'http://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png' }} style={styles.profileImg} ></Image>
                <Text style={styles.profileTxt}>{props.item.username}</Text>
            </View>
            <View style={styles.post}>
                <Text style={styles.postTitle} onPress={props.onPress} >{props.item.title}</Text>
                <Text style={styles.postData} >{props.item.post}</Text>
            </View>
            <View>

            </View>
            
        </View>

    )
}

const styles = StyleSheet.create({
    containerList: {
        backgroundColor: '#ffffff',
        width: '97%',
        flex: 1,
        elevation:12,
        margin:'1%',
        // borderRadius:10,
        paddingBottom:'2%'
    },
    profileContainer:{
        flexDirection:'row',
    },
    profileImg: {
        width: 50,
        aspectRatio: 1,
        marginTop: '4%',
        marginLeft:'4%',
        marginRight:'4%',
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'grey'
    },
    profileTxt: {
        textDecorationLine: 'underline',
        fontSize:15,
         top: '7.5%',
         fontWeight:'bold'
    },
    post: {
        width: '100%',
        paddingLeft:'4%',
        paddingRight:'4%'
    },
    postTitle:{
        fontSize:25,
        color:'black',
        fontWeight:'600'
    },
    postData:{
        fontSize:18,
        fontWeight:'100',
        color:'#565151',
        fontFamily:'sans-serif'
    },
    reviewPost:{
        
    }

})