import  { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_FAIL, REGISTER_SUCCESS,LOGOUT_SUCCESS} from '../actions/auth'


const initialState = {
    accessToken: localStorage.getItem('token'),    
    isAuthenticated: null, 
    username: null,
    email: null,
    roles: []
}


export default function (state= initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.accessToken)
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true                
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
            localStorage.removeItem('token')
            return{
                ...state,
                accessToken:null,                
                isAuthenticated: null,
                username: null,
                email: null,
                roles: []
            }
        default: 
            return state
    }
}