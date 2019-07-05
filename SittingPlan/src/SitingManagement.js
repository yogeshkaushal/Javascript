import React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    Alert,
    View,
    TouchableOpacity,
    FlatList,
    Picker,
    TextInput,
    Keyboard
} from 'react-native';
import firebase from 'react-native-firebase'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
    EmployeeList,
    SeatListComponent,
    AutoCompleteInput,
    DatePickComp
} from './Component'
import Spinner from 'react-native-loading-spinner-overlay'
import { setRefreshing } from './Action'
import { connect } from 'react-redux'

class SitingManagement extends React.Component {

    static navigationOptions = {
        title: "Sitting Arrangement",
        headerStyle: {
            backgroundColor: '#184755',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20
        },
    }

    state = {
        selectedOffice: '',
        pickedDate: '',
        officesList: [{ officeName: 'Select Office', seats: 0 }]
    }
    componentWillMount = () => {
        this.getOfficesList()
    }
    render() {
        return (
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <Spinner
                        visible={this.props.refreshing}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <DatePickComp
                        pickerArray={this.state.officesList}
                        selectedValue={this.state.selectedOffice}
                        onChange={(itemValue) => {
                            this.setState({
                                selectedOffice: itemValue
                            })
                        }}
                        showDateTimePicker={this.showDateTimePicker}
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        datePicked={this.state.pickedDate}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }
    getOfficesList = () => {
        this.props.setRefreshing(true)
        firebase.firestore().collection('offices').get()
            .then((querySnapshot) => {
                let arr = []
                querySnapshot.forEach((doc) => {
                    arr = [...arr, doc.data()]
                });
                this.setState({
                    officesList: [...this.state.officesList, ...arr],
                })
                this.props.setRefreshing(false)

            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        let day = date.getDate()
        let month = date.getMonth()
        let year = date.getFullYear()
        console.log(month)
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let datePicked = day + '-' + monthNames[month] + '-' + year
        this.setState({
            pickedDate: datePicked
        })
        // this.fetchByDate(this.state.pickedDate)
        this.hideDateTimePicker();
    }



    fetchByDate = (date) => {
        // this.setState({ refreshing: true })
        // firebase.firestore().collection("offices").where('officeName', '==', this.state.officeName.officeName).get()
        //     .then((querySnapshot) => {
        //         querySnapshot.forEach((doc) => {
        //             // doc.data() is never undefined for query doc snapshots
        //             firebase.firestore().collection('offices').doc(doc.id).collection('seatAlotted').where("date", "==", date).get()
        //                 .then((querySnapshot) => {
        //                     let arr = []
        //                     querySnapshot.forEach((doc) => {
        //                         console.log(doc.id, " => ", doc.data());
        //                         arr = [...arr, doc.data()]
        //                     });
        //                     arr = arr.sort(this.compare);
        //                     this.setState({
        //                         listArray: [...this.state.listArray, ...arr],
        //                         refreshing: false
        //                     })
        //                 })
        //                 .catch(function (error) {
        //                     console.error("Error adding document: ", error.message);
        //                 });
        //         })
        //     }).catch(function (error) {
        //         console.log("Error getting documents: ", error);
        //     })
    }

}

function mapStoreToProps(state) {
    return {
        officesList: state.officesList,
        refreshing: state.refreshing
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setRefreshing: (status) => {
            dispatch(setRefreshing(status))
            // dispatch({ type: 'setUserData', email, uid, username, address, business ,About})
        }
    }
}
export default connect(mapStoreToProps, mapDispatchToProps)(SitingManagement);


const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 10,
        backgroundColor: 'white'
    },
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
    }
})