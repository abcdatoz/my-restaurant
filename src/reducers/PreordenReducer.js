import {GET_PREORDENES, GET_PREORDENES_RESTAURANT, ADD_PREORDEN,EDIT_PREORDEN,DELETE_PREORDEN} from '../actions/PreordenAction'

const initialState = {
    lista:[]
}

export default function foo(state=initialState, action){
    switch (action.type){
        case GET_PREORDENES:
            return {
                ...state,
                lista: action.payload

            };
        case GET_PREORDENES_RESTAURANT:
            return {
                ...state,
                lista: action.payload

            };
        
        case ADD_PREORDEN:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_PREORDEN:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_PREORDEN:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}