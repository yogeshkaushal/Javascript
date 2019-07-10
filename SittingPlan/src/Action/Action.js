import firebase from 'react-native-firebase'
import { combineReducers } from 'redux'
export const setRefreshing = (status) => {
    return (dispatch) => {
        dispatch({ type: 'setRefreshing', message: status })
    }
}

// export const dispatcher = (actionType, message) => {
//   return {
//     type: actionType, message
//   }
// };   

//get list of employees from selected office 
export const getEmployees = (officeName) => {
    return (dispatch) => {
        firebase.firestore().collection("employees").get()
            .then(res => {
                const data = res.docs[0].data()
                if (data.employee != undefined) {
                    dispatch({ type: 'addEmployees', message: data.employee })
                } else {
                }
            }).catch(err => {
                console.log(err)
            })
    }
}

//array for flatlist in searching 
export const filterArray = (text, employeeArray) => {
    return (dispatch) => {
        if (employeeArray != undefined) {
            let array = []
            for (let i = 0; i < employeeArray.length; i++) {
                if (employeeArray[i].email.includes(text))
                    array.push(employeeArray[i].email)
                dispatch({ type: 'filterArray', message: array })
            }
        }

    }
}
export const setName = (item, employeeList) => {
    return (dispatch) => {
        employeeList.forEach((element) => {
            if (element.email == item)
                dispatch({ type: 'setName', message: element.name })
        });
    }
}

export const makeArray = (number) => {
    return (dispatch) => {
        let seatsArray = [];
        for (i = 1; i <= number; i++) {
            let b = i + ""
            seatsArray.push(b)
        }
        let seatsArray2 = ["Select Seat"]
        // seatsArray = [...seatsArray2, ...seatsArray]
        dispatch({ type: 'makeArray', message: [...seatsArray2, ...seatsArray]})
    }
}
export const onAddClicked = (email, name, seat, localArray) => {

    return (dispatch) => {
        if (localArray != undefined) {
            let updatedLocalArray = localArray.filter(item => {
                // console.log("state", item.seat !== parseInt(this.state.selectedSeat), item.seat, parseInt(this.state.selectedSeat))
                // console.log("state", item.name !== this.state.employeename)
                return item.seat != parseInt(seat) && item.name !== name
            })

            localArray = [...updatedLocalArray, {
                email: email,
                name: name,
                seat: seat,
                key: new Date().getTime()
            }]

        }
        else {
            localArray = [{
                email: email,
                name: name,
                seat: seat,
                key: new Date().getTime()
            }]
        }
        dispatch({ type: 'addInLocalArray', message: localArray })
    }
}
export const delInLocAry = (localArray) => {
    return (dispatch) => {
        dispatch({ type: 'delInLocAry', message: localArray })
    }
}