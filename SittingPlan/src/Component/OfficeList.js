import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'

export default (props) => {
    return (
        <View style={styles.container}>
            {/* <View
                style={styles.listContainter}
            > */}
            <Text
                style={styles.listText}
            > {props.index + 1}.{props.item.officeName}
            </Text>
            <View style={styles.detailContainer}>
                <View style={styles.quesContainer}>
                    <Text style={[styles.quesText, { padding: '3%', width: '100%' }]} numberOfLines={2}>
                        Number of Seats:{props.item.seats}</Text>
                </View>
                <View style={styles.timerContainer}>
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={props.onPressEdit}>
                        <Entypo name='edit' size={22} color='black' />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onPress}>
                        <FontAwesome5 name="trash" size={22} color='#184755' />
                    </TouchableOpacity>
                </View>
            </View>
            {/* </View> */}

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '95%',
        flex: 1,
        elevation: 5,
        margin: 10,
        borderRadius: 7,
        padding: 15,
    },
    listContainter: {
        padding: 10,
        // paddingHorizontal: 30,
        borderBottomColor: '#388468',

    },
    detailContainer: {
        flexDirection: 'row',
    },
    timerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    quesContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    listText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333232',
    },
    timerText: {
        fontSize: 15,
        marginBottom: '1%',
        marginLeft: '2%',
    },
    quesText: {
        fontSize: 15,
        color: 'black'
    }
})

