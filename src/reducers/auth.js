import  { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS,LOGOUT_SUCCESS} from '../actions/auth'


const initialState = {
    // accessToken: localStorage.getItem('token'),    
    accessToken: null,
    isAuthenticated: null, 
    username: null,
    owner: null,
    roles: []
}


export default function foo(state= initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            //localStorage.setItem('token', action.payload.token)            
            return{
                ...state,      
                ...action.payload,          
                isAuthenticated: true,
                owner: action.payload.id                
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            // localStorage.removeItem('token')
            return{
                ...state,
                accessToken:null,                
                isAuthenticated: null,
                username: null,
                owner: null,
                roles: []
            }
        default: 
            return state
    }
}