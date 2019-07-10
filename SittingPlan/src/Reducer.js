const INITIAL_STATE = {
  employeeList: [],
  refreshing: false,
  filterArray: [],
  employeeName: '',
  seatsArray: [],
  localArray:[],
 
};
import {combineReducers} from 'redux'

first=(state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'setRefreshing':
      return { ...state, refreshing: action.message }
    case 'addEmployees':
      return { ...state, employeeList: action.message }
    case 'filterArray':
      return { ...state, filterArray: action.message }
    case 'emptyList':
      return { ...state, filterArray: [] }
    case 'setName': 
      return { ...state, employeeName: action.message }
    case 'makeArray':
      return { ...state,seatsArray:action.message }
    case 'addInLocalArray': 
    console.table(action.message)
    return { ...state, localArray: action.message}
    case 'delInLocAry':
      return { ...state, localArray: action.message}
    default:
      return state;
  }
};
export default combineReducers({
first
})