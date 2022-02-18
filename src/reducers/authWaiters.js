import  { W_LOGIN_SUCCESS, W_LOGIN_FAIL, W_LOGOUT_SUCCESS} from '../actions/authWaiters'


const initialState = {
    wAuthenticated: false,
    idWaiter: null,
    idRestaurant: null,
    nameWaiter: null,
}


export default function foo(state= initialState,action){
    switch(action.type){
        case W_LOGIN_SUCCESS:
            return{
                wAuthenticated: true,
                idWaiter: action.payload.idWaiter,
                idRestaurant: action.payload.idRestaurant,
                nameWaiter: action.payload.nameWaiter,
            }
        case W_LOGIN_FAIL:
        case W_LOGOUT_SUCCESS:
        
            return{
                wAuthenticated: false,
                idWaiter: null,
                idRestaurant: null,
                nameWaiter: null,
            }
        default: 
            return state
    }
}