import { TouchableOpacity, Text, StyleSheet, View ,TextInput,
FlatList} from 'react-native'
import React from 'react'

export default (props) => {
    return (
        <View style={styles.autocompleteContainer}>
            <TextInput
                style={{
                    width: '100%',
                    padding: 10,
                    fontSize: 18,
                    paddingLeft: "4%",
                    borderRadius: 15,
                }}
                placeholder='Enter Employee email-id'
                onChangeText={(text) => {
                    props.onChangeText(text)
                }}
                value={props.value}
            />
            <FlatList
                style={{
                    flexGrow: 0,
                    borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15
                }}
                data={props.listData}
                keyboardShouldPersistTaps={'handled'}
                renderItem={({ item }) => {
                    return (    
                        <TouchableOpacity
                            style={{
                                width: '70%',
                                backgroundColor: 'white',
                                paddingLeft: 15,
                                borderRadius: 15
                            }}
                            onPress={() => {
                                props.onItemPress(item)
                            }}>
                            <Text style={{
                                fontSize: 16,
                                paddingTop: 10,
                                paddingBottom: 10,
                                fontWeight: 'bold',
                                color: 'black'
                            }}>{item}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    autocompleteContainer: {
        flex: 1,
        left: 10,
        right: 10,
        top: 70,
        position: 'absolute',
        zIndex: 1,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 5
    },
})

