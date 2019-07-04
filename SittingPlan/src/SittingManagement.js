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
    AutoCompleteInput
} from './Component'
import Spinner from 'react-native-loading-spinner-overlay'

export default class SittingManagement extends Component {

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
        officeArray: [{ officeName: 'Select Office', seats: 0 }],
        // Arpan
        localArray: [],
        officeName: '',
        datePicked: '',
        refreshing: false,
        searchList: [],
        query: '',
        employee: [],
        setName: [],
        employeename: '',
        listArray: [],
        seatsArray: ['Select Seat'],
        disabled: true,
        selectedSeat: 0
    }

    componentWillMount() {
        this.getOfficeDataFirebase()
    }

    handleTextChange = (text) => {
        if (text.length == 0) {
            this.setState({
                searchList: [],
            })
        } else {
            this.searchList(text)
        }
        this.setState({ query: text })
    }

    getEmployees = (officeName) => {
        this.setState({
            refreshing: true,
            disabled: false
        })
        console.log("data", officeName)
        firebase.firestore().collection("offices")
            .where("officeName", "==", officeName).get()
            .then(res => {
                const data = res.docs[0].data()
                if (data.employee != undefined) {
                    this.setState({
                        refreshing: false,
                        setName: data.employee
                    })
                } else {
                    this.setState({
                        refreshing: false
                    })
                }

            }).catch(err => {
                console.log(err)
            })
    }

    render() {
        return (
            <KeyboardAwareScrollView
                keyboardShouldPersistTaps={'handled'}
                enableOnAndroid={true}
            >
                <View style={styles.container}>
                    <Spinner
                        visible={this.state.refreshing}
                        textContent={'Loading...'}
                        textStyle={styles.spinnerTextStyle}
                    />
                    <View style={styles.headerFirst}>
                        <Picker
                            selectedValue={this.state.officeName}
                            style={{ height: 20, flex: 1 }}
                            itemStyle={{ fontSize: 28 }}
                            onValueChange={(itemValue) => {
                                if (itemValue.seats != 0) {
                                    this.getEmployees(itemValue.officeName)
                                } else {
                                    this.setState({
                                        disabled: true,
                                    })
                                }
                                this.setState({
                                    officeName: itemValue,
                                    listArray: [],
                                    datePicked: '',
                                    employeename: '',
                                    selectedSeat: 0,
                                    query: '',
                                    searchList: [],
                                    btnWidth: 0
                                })
                                this.makearray(itemValue.seats)
                            }}>
                            {
                                this.state.officeArray.map((item, index) => {
                                    return (<Picker.Item label={item.officeName} value={item} key={index} />)
                                })
                            }

                        </Picker>

                        <TouchableOpacity
                            onPress={this.showDateTimePicker}
                            disabled={this.state.disabled}
                            style={{
                                flexDirection: 'row',
                                borderWidth: 1,
                                borderColor: '#184755',
                                flex: 1,
                                paddingHorizontal: 2,
                                paddingVertical: 5,
                                alignItems: 'center',
                                borderRadius: 5,
                            }}>
                            <Text style={{
                                fontSize: 20,
                                color: 'black',
                                fontWeight: 'bold',
                                marginHorizontal: 5
                            }}>Date</Text>

                            <AntDesign name="calendar" size={23} color='#184755' />

                            <Text style={{
                                marginStart: 5,
                                fontSize: 17,
                                color: 'grey'
                            }}>{this.state.datePicked}</Text>
                        </TouchableOpacity>

                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                        />

                    </View>
                    <AutoCompleteInput
                        onChangeText={(text) => {
                            this.handleTextChange(text)
                        }}
                        value={this.state.query}
                        listData={this.state.searchList}
                        onItemPress={() => {
                            Keyboard.dismiss()
                            this.setName(item)
                            this.setState({
                                query: item,
                                searchList: [],

                            })
                        }}
                    ></AutoCompleteInput>
                    <View style={styles.headerThird}>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            flexDirection: 'row'
                        }}>
                            <Text style={{
                                fontSize: 17,
                                color: 'black',
                                fontWeight: 'bold'
                            }}>Name:</Text>
                            <Text style={{
                                marginStart: 5,
                                fontSize: 17,
                                color: 'black'
                            }}>{this.state.employeename}</Text>
                        </View>

                        <View style={{
                            alignSelf: 'center',
                            flex: 1,
                        }}>
                            <Picker
                                selectedValue={this.state.selectedSeat}
                                onValueChange={(itemValue, index) => {
                                    console.log(itemValue, itemValue)
                                    this.setState({
                                        selectedSeat: itemValue
                                    })
                                }
                                }
                                style={styles.PickerView}>
                                {
                                    this.state.seatsArray.map((item, index) => {
                                        return (<Picker.Item label={item} value={item} key={index} />)
                                    })
                                }

                            </Picker>
                        </View>
                    </View>

                    {this.state.localArray.length > 0 &&
                        <FlatList
                            scrollEnabled={false}
                            style={styles.listStyle}
                            data={this.state.localArray}
                            renderItem={({ item, index }) => {
                                return (
                                    <SeatListComponent
                                        hasDelete={true}
                                        item={item}
                                        index={index}
                                        onDeletePress={(key) => {
                                            const array = this.state.localArray.filter(item => item.key != key)
                                            this.setState({
                                                localArray: array
                                            })
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
                            this.onAddClicked()
                        }}
                    >
                        <Text style={{
                            fontSize: 17,
                            fontWeight: 'bold',
                            color: 'white'
                        }}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btnMain, { marginTop: 10 }]}
                        onPress={() => {
                            if (this.state.localArray.length != 0) {
                                this.uploadArrayFirebase()
                            } else {
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
                        }}>Submit All</Text>
                    </TouchableOpacity>

                    <View style={styles.btmContainer}>
                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: 'white',
                            elevation: 5,
                            borderRadius: 7,
                            borderWidth: .5,
                            borderColor: '#5ed6bf'
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                paddingLeft: 15
                            }}>
                                <Text style={styles.tableText}>Seat: </Text>
                                <Text style={[styles.tableText, { marginStart: 15 }]}
                                    numberOfLines={1}
                                >Employees</Text>
                            </View>
                        </View>
                        <FlatList
                            scrollEnabled={false}
                            style={styles.listStyle}
                            data={this.state.listArray}
                            renderItem={({ item, index }) => {
                                return (
                                    <SeatListComponent
                                        item={item}
                                        index={index}
                                        hasDelete={false}
                                    />
                                )
                            }}

                        />

                    </View>

                </View>
            </KeyboardAwareScrollView>
        )
    }

    /**------------------------ */

    onAddClicked = () => {
        if (this.state.query.length != 0 &&
            this.state.selectedSeat != 0 &&
            this.state.employeename.length != 0) {

            //remove if already present
            let updatedLocalArray = this.state.localArray.filter(item => {
                // console.log("state", item.seat !== parseInt(this.state.selectedSeat), item.seat, parseInt(this.state.selectedSeat))
                // console.log("state", item.name !== this.state.employeename)
                return item.seat != parseInt(this.state.selectedSeat) && item.name !== this.state.employeename
            })
            this.setState({
                localArray: [...updatedLocalArray, {
                    email: this.state.query,
                    name: this.state.employeename,
                    seat: this.state.selectedSeat,
                    key: new Date().getTime()
                }],
                query: '',
                selectedSeat: 0,
                employeename: '',
            })
            console.log("state", this.state.localArray)
        } else {
            Alert.alert(
                'Empty Field',
                'One of you field is empty enter some text to Continue'
            )
        }
    }

    uploadArrayFirebase = () => {
        this.setState({
            refreshing: true
        })
        this.uploadArrayFirebaseAsync()
            .then(res => {
                this.setState({
                    localArray: [],
                    refreshing: false
                })

            })
            .catch(err => console.log(err))
    }

    uploadArrayFirebaseAsync = async () => {
        try {
            console.log(this.state.officeName.officeName)
            const querySnapshot = await firebase.firestore().collection("offices")
                .where('officeName', '==', this.state.officeName.officeName).get()

            const docId = querySnapshot.docs[0].id
            let arrayFirebase = []
            for (let i = 0; i < this.state.localArray.length; i++) {
                const user = this.state.localArray[i]
                const userObj = {
                    employee: user.name,
                    email: user.email,
                    seat: parseInt(user.seat),
                    date: this.state.datePicked
                }
                arrayFirebase.push(userObj)
                await firebase.firestore().collection('offices').doc(docId).collection('seatAlotted').add(userObj)
            }

            const firebaseObj = {
                officeName: this.state.officeName.officeName,
                array: arrayFirebase
            }
            await firebase.firestore().collection("emailArray").add(firebaseObj)

            this.setState({
                listArray: [...this.state.listArray, ...arrayFirebase]
            })

        } catch (err) {
            console.log(err)
        }

    }


    /**------------------------ */

    makearray = (number) => {
        let seatsArray = [];
        for (i = 1; i <= number; i++) {
            let b = i + ""
            seatsArray.push(b)
        }
        let seatsArray3 = ["Select Seat"]
        let seatsArray2 = [...seatsArray]
        this.setState({
            seatsArray: [...seatsArray3, ...seatsArray2]
        })
        console.log('arrays is' + this.state.seatsArray)
    }


    getOfficeDataFirebase = () => {
        this.setState({ refreshing: true })
        firebase.firestore().collection('offices').get()
            .then((querySnapshot) => {
                let arr = []
                querySnapshot.forEach((doc) => {
                    arr = [...arr, doc.data()]
                });
                this.setState({
                    officeArray: [...this.state.officeArray, ...arr],
                    refreshing: false,
                })
                console.log(this.state.array)
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
    }

    deleteItemArray = (index) => {
        const list = this.state.listArray
        list.splice(index, 1)
        this.setState({
            listArray: list
        })
    }

    handleSearch = (employee) => {
        console.log("array" + employee)
        emailarray = employee.map((item) => {
            return item.email
        })
        this.setState({
            employee: emailarray
        })
    }

    searchList = (text) => {
        let emplyeeArray = this.state.setName
        let array = []
        for (let i = 0; i < emplyeeArray.length; i++) {
            if (emplyeeArray[i].email.includes(text))
                array.push(emplyeeArray[i].email)
        }
        this.setState({
            searchList: array
        })
    }
    setName = (item) => {
        this.state.setName.forEach((element) => {
            if (element.email == item) {
                console.log(element.name)
                this.setState({
                    employeename: element.name
                })

            }
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
            // textColor: 'grey',
            datePicked: datePicked,
            listArray: [],
            employeename: '',
            selectedSeat: 0,
            query: '',
            searchList: [],
            btmWidth: 0
        })
        this.fetchByDate(this.state.datePicked)
        this.hideDateTimePicker();
    };

    fetchByDate = (date) => {
        this.setState({ refreshing: true })
        firebase.firestore().collection("offices").where('officeName', '==', this.state.officeName.officeName).get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    firebase.firestore().collection('offices').doc(doc.id).collection('seatAlotted').where("date", "==", date).get()
                        .then((querySnapshot) => {
                            let arr = []
                            querySnapshot.forEach((doc) => {
                                console.log(doc.id, " => ", doc.data());
                                arr = [...arr, doc.data()]
                            });
                            arr = arr.sort(this.compare);
                            // arr = this.bubbleSort(arr)
                            this.setState({
                                listArray: [...this.state.listArray, ...arr],
                                refreshing: false
                            })
                        })
                        .catch(function (error) {
                            console.error("Error adding document: ", error.message);
                        });
                })
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            })
    }

    compare=(a, b)=> {
        if (a.seat < b.seat) {
            return -1;
        }
        if (a.seat > b.seat) {
            return 1;
        }
        return 0;
    }



}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        padding: 10,
        backgroundColor: 'white'
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    PickerView: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 10,
    },
    headerFirst: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerSecond: {
        flexDirection: 'row',
        borderWidth: 1,
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
    headerThird: {
        flexDirection: 'row',
        marginTop: 85,
        width: '100%',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btmContainer: {
        paddingTop: 10
    },
    tableText: {
        fontSize: 18,
        color: 'black',
        paddingVertical: 20,
        paddingLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    listStyle: {
        flexGrow: 0,
        marginVertical: 10,
    }
})          