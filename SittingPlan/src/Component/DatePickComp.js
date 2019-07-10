import React from 'react'
import DateTimePicker from "react-native-modal-datetime-picker";
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity, Text, StyleSheet, View,Picker } from 'react-native'
export  default (props)=>{
    return(
        <View style={styles.headerFirst}>
        <Picker
             selectedValue={props.selectedValue}
            style={{ height: 20, flex: 1 }}
            itemStyle={{ fontSize: 28 }}
            onValueChange={(itemValue) => {
                
                props.onChange(itemValue)
            }}>
            {
                props.pickerArray.map((item, index) => {
                    return (<Picker.Item label={item.officeName} value={item} key={index} />)
                })
            }
        </Picker>
        <TouchableOpacity
            onPress={props.showDateTimePicker}
            style={styles.datePicker}>
            <Text style={styles.dateText}>Date</Text>
            <AntDesign name="calendar" size={23} color='#184755' />
            <Text style={styles.datePick}>{props.datePicked}</Text>
        </TouchableOpacity>

        <DateTimePicker
            isVisible={props.isVisible}
            onConfirm={props.onConfirm}
            onCancel={props.onCancel}
        />

    </View>
    )
}
const styles = StyleSheet.create({
    datePicker: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#184755',
        flex: 1,
        paddingHorizontal: 2,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 5,
    },
    datePick: {
        marginStart: 5,
        fontSize: 17,
        color: 'grey'
    },
    dateText: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginHorizontal: 5
    },
    headerFirst: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
})