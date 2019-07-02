
import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default (props) => {
    return (
        <View style={styles.CheckBoxView}>
            <CheckBox
                title={'Male'}
                iconLeft
                // iconType='AntDesign'
                checkedIcon='check'
              
                checkedColor='blue'
                checked={props.maleCheck}
                containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                onPress={()=>{props.onPressMale}}
            />

            <CheckBox
                title={'Female'}
                iconLeft
                // iconType='AntDesign'
                checkedIcon='check'
                checkedColor='blue'
                checked={props.femaleCheck}
                containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                onPress={()=>{props.onPressfemale}}
            />
        </View>
    )
}

const styles = StyleSheet.create({

CheckBoxView: {
    flexDirection: 'row',
    marginTop: 20
}

})