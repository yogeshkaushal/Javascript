import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default (props) => {
    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            elevation: 5,
            marginVertical: 4,
            marginHorizontal: 5,
            borderRadius: 5,
            borderWdth: .5,
            borderColor: '#5ed6bf',
        }}>
            <View style={{ flex: 1.2, flexDirection: 'row', paddingLeft: 32 }}>
                <Text style={styles.tableText}>{props.item.seat}.</Text>
                <Text style={styles.tableText2} numberOfLines={1}>{props.item.employee}</Text>
            </View>
            {/* <View style={{ flex: .5, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={props.onPress}>
                    <FontAwesome5 name="trash" size={18} color='#184755' />
                </TouchableOpacity>
            </View> */}
        </View>


    )
}
const styles = StyleSheet.create({
    listContainter: {
        backgroundColor: 'white'
    },
    tableText: {
        fontSize: 18,
        color: 'black',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tableText2: {
        fontSize: 18,
        color: 'black',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 38,
        justifyContent: 'center',
        alignItems: 'center'
    },
    detailContainer: {
        flexDirection: 'row',
        marginTop: '2%',
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333232',
        height: 30,

    },
    timerText: {
        fontSize: 15,
        marginBottom: '1%',
        marginLeft: '2%',
    },
    quesText: {
        fontSize: 17,
        color: 'black'
    }
})

