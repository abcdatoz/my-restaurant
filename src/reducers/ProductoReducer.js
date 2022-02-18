import {GET_PRODUCTOS,ADD_PRODUCTO,EDIT_PRODUCTO,DELETE_PRODUCTO} from '../actions/ProductoAction'

const initialState = {
    lista:[]
}

export default function foo(state=initialState, action){
    switch (action.type){
        case GET_PRODUCTOS:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_PRODUCTO:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_PRODUCTO:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_PRODUCTO:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}