import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function Hooks(){

        const [name, setName] = useState('')

        return (
            <View>
                <TextInput placeholder='Name' style={styles.textInput} onChangeText={(text) => {setName(text)}} />

                <Text>You clicked {count} times</Text>
                <Text>Name is {name}</Text>
                <Button
                    onPress={() => setCount(count + 1)}
                    title="Click me"
                    color="red"
                    accessibilityLabel="Click this button to increase count"
                />
            </View>
        )
    }



const styles = StyleSheet.create({

    textInput: {
        borderWidth: 1,
        width: '80%',
        marginTop: 20,
        alignSelf: 'center',
        paddingLeft: 10,
        paddingVertical: 7
    }
})