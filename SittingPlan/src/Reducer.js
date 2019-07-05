// 
  
  const INITIAL_STATE = {
  listArray:[],
  refreshing:false
  }; 
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'setRefreshing':
        return{refreshing:action.message}
      case 'addArray':
        return{listArray:action.array}
      default:
        return state;
    }
  };
  
  
  