import {GET_RESTAURANTS,ADD_RESTAURANT,EDIT_RESTAURANT,DELETE_RESTAURANT} from '../actions/RestaurantActions'

const initialState = {
    lista:[]
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_RESTAURANTS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_RESTAURANT:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_RESTAURANT:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_RESTAURANT:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}