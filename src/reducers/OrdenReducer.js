import {GET_ORDENES,ADD_ORDEN,EDIT_ORDEN,DELETE_ORDEN} from '../actions/OrdenAction'

const initialState = {
    lista:[]
}

export default function foo(state=initialState, action){
    switch (action.type){
        case GET_ORDENES:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_ORDEN:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_ORDEN:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_ORDEN:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}