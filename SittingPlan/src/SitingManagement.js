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
import Reducer from './Reducer'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from "react-native-modal-datetime-picker";
import {
    SeatListComponent,
    DatePickComp,
    AutoCompleteInput
} from './Component'
import Spinner from 'react-native-loading-spinner-overlay'
import {
    setRefreshing,
    getEmployees,
    filterArray,
    setName,
    onAddClicked,
    makeArray,
    delInLocAry
} from './Action'
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
        officesList: [{ officeName: 'Select Office', seats: 0 }],
        email: '',
        // localSeatsArray: [],
        selectedSeat: ''
        // setName: [],
        // searchList: [],
        // query: ''
    }
    componentWillMount = () => {
        this.getOfficesList()
    }
    render() {

        return (
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
                        this.props.getEmployees(itemValue.officeName)
                        this.props.makeArray(itemValue.seats)
                    }}
                    showDateTimePicker={this.showDateTimePicker}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                    datePicked={this.state.pickedDate}
                />
                <AutoCompleteInput
                    onChangeText={(text) => {
                        console.table(this.props.employeeList)
                        this.handleTextChange(text)
                    }}
                    value={this.state.email}
                    listData={this.props.filterArray}
                    onItemPress={(item) => {
                        Keyboard.dismiss()
                        this.props.emptyList()
                        this.props.setName(item, this.props.employeeList)
                        this.setState({
                            email: item,
                        })
                    }}
                ></AutoCompleteInput>
                <View style={styles.headerThird}>
                    <View style={styles.headerThirdContainer}>
                        <Text style={styles.nameText}>Name:</Text>
                        <Text style={styles.nameText}> {this.props.employeeName}</Text>
                    </View>


                    <View style={styles.pickerConatiner}>
                        <Picker
                            selectedValue={this.state.selectedSeat}
                            onValueChange={(itemValue, index) => {

                                this.setState({
                                    selectedSeat: itemValue
                                })
                            }
                            }
                            style={styles.PickerView}>
                            {
                                this.props.seatsArray.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index} />)
                                })
                            }

                        </Picker>
                    </View>
                </View>
                {this.props.localArray != undefined &&
                    <FlatList
                        scrollEnabled={false}
                        style={styles.listStyle}
                        data={this.props.localArray}
                        renderItem={({ item, index }) => {
                            return (
                                <SeatListComponent
                                    hasDelete={true}
                                    item={item}
                                    index={index}
                                    onDeletePress={(key) => {
                                        const array = this.props.localArray.filter(item => item.key != key)
                                        this.props.delInLocAry(array)

                                    }}
                                // onPressView={() => this._onPressItem(item, index)}
                                />
                            )
                        }}
                    />
                }
                <TouchableOpacity style={styles.btnMain}
                    onPress={() => {
                        // add to local flatlist
                        if (this.state.email.length != 0 &&
                            this.state.selectedSeat != 0 &&
                            this.props.employeeName.length != 0) {
                            this.props.onAddClicked(this.state.email, this.props.employeeName, this.state.selectedSeat, this.props.localArray)
                        }
                        else {
                            Alert.alert(
                                'Empty Field',
                                'One of you field is empty enter some text to Continue'
                            )
                        }

                    }}
                >
                    <Text style={{
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: 'white'
                    }}>Add</Text>
                </TouchableOpacity>
            </View>

        )
    }
    // makeArray = (number) => {
    //     let seatsArray = [];
    //     for (i = 1; i <= number; i++) {
    //         let b = i + ""
    //         seatsArray.push(b)
    //     }
    //     let seatsArray3 = ["Select Seat"]
    //     let seatsArray2 = [...seatsArray]
    //     this.setState({
    //         localSeatsArray: [...seatsArray3, ...seatsArray2]
    //     })
    //}
    handleTextChange = (text) => {
        this.props.filterArrayy(text, this.props.employeeList)
        if (text.length == 0) {
            this.props.emptyList()
        }
        this.setState({ email: text })
    }
    getOfficesList = () => {
        // this.props.setRefreshing(true)
        firebase.firestore().collection('offices').get()
            .then((querySnapshot) => {
                let arr = []
                querySnapshot.forEach((doc) => {
                    arr = [...arr, doc.data()]
                });
                this.setState({
                    officesList: [...this.state.officesList, ...arr],
                })
                // this.props.setRefreshing(false)

            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }
    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    handleDatePicked = date => {
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



function mapStateToProps(state) {
    console.log(state.first)
    return {
        employeeList: state.first.employeeList,
        refreshing: state.first.refreshing,
        filterArray: state.first.filterArray,
        employeeName: state.first.employeeName,
        seatsArray: state.first.seatsArray,
        localArray: state.first.localArray
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setRefreshing: (status) => {
            dispatch(setRefreshing(status))
        },
        getEmployees: (officename) => {
            dispatch(getEmployees(officename))
        },
        filterArrayy: (text, employeeList) => {
            dispatch(filterArray(text, employeeList))
        },
        emptyList: () => {
            dispatch({ type: 'emptyList' })
        },
        setName: (item, employeeList) => {
            dispatch(setName(item, employeeList))
        },
        makeArray: (number) => {
            dispatch(makeArray(number))
        },
        onAddClicked: (email, name, seat, localArray) => {
            dispatch(onAddClicked(email, name, seat, localArray))
        },
        delInLocAry: (localArray) => {
            dispatch(delInLocAry(localArray))
        },

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SitingManagement);


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    },
    headerThird: {
        flexDirection: 'row',
        marginTop: 85,
        width: '100%',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerThirdContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    nameText: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold'
    },
    pickerConatiner: {
        alignSelf: 'center',
        flex: 1,
    },
    btnMain: {
        width: '60%',
        height: 40,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#184755',
        marginTop: 15,
        borderRadius: 10,
    },
    listStyle: {
        flexGrow: 0,
        marginVertical: 10,
    }
})