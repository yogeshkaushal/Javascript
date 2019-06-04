



const initialState={

uid:'',
username:'',
email:'',
phoneno:'',
gender:''
}
const Reducer = (state=initialState,action)=>{
    switch(action.type)
    {
         case 'SET_DATA':
         console.log("from reduxer"+action.username+action.gender+action.phoneNo+action.email+action.uid)
         return{
             email:action.email,
             uid:action.uid,
             username:action.username,
             phoneno:action.phoneNo,
             gender:action.gender
         }

         case 'UPDATE_DATA':
         console.log('from Reducer : '+action.username+action.phoneNo+action.gender+action.uid
        + action.email)
         return{
             username:action.username,
             gender:action.gender,
             phoneno:action.phoneNo,
             uid:action.uid,
             email:action.email
         }
        
         
    }
    return state;
  }
  export default Reducer;