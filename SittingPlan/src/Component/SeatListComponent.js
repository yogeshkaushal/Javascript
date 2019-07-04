import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

export default (props) => {

    const localItem = props.item

    let name = ""

    if (localItem.name)
        name = localItem.name
    else if (localItem.employee)
        name = localItem.employee

    return (
        <View style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            elevation: 2,
            margin: 4,
            borderRadius: 5,
            borderWidth: .5,
            borderColor: '#5ed6bf',
        }}>
            <View style={{
                flex: 1,
                paddingVertical: 15,
                marginHorizontal: 5,
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <Text style={styles.tableText}>{localItem.seat}.</Text>
                <Text style={styles.tableText} numberOfLines={1}>{name}</Text>
            </View>
            {props.hasDelete &&
                <TouchableOpacity style={{
                    position: 'absolute',
                    end: 12,
                    alignSelf: 'center'
                }} onPress={() => props.onDeletePress(localItem.key)}>
                    <FontAwesome5 name="trash" size={18} color='#184755' />
                </TouchableOpacity>
            }

        </View>


    )
}

const styles = StyleSheet.create({
    listContainter: {
        backgroundColor: 'white'
    },
    tableText: {
        marginStart: 25,
        fontSize: 18,
        color: 'black',
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