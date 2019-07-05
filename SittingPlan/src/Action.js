import firebase from 'react-native-firebase'
export const Refresh = (actionType, message) => {
  return {
    type: actionType, message
  }
};
export const setRefreshing = (status) => {
  return (dispatch) => {
    dispatch(Refresh('setRefreshing', status))
  }

}

export const employeeList = (actionType, array) => {
  return {
    type: actionType, array
  }
};

export const fetchByDate = (date) => {
  return (dispatch) => {
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
              arr = arr.sort(compare);
              dispatch(employeeList('addArray',arr))
              // this.setState({
              //   listArray: [...this.state.listArray, ...arr],
              //   refreshing: false
              // })
            })
            .catch(function (error) {
              console.error("Error adding document: ", error.message);
            });
        })
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      })
  }
}
const compare = (a, b) => {
  if (a.seat < b.seat) {
    return -1;
  }
  if (a.seat > b.seat) {
    return 1;
  }
  return 0;
}


