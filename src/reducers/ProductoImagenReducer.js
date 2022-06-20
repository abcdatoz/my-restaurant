import {GET_PRODUCTOIMAGENES, GET_PRODUCTOIMAGENES_RESTAURANT,ADD_PRODUCTOIMAGEN,EDIT_PRODUCTOIMAGEN,DELETE_PRODUCTOIMAGEN} from '../actions/ProductoImagenAction'

const initialState = {
    lista:[]
}

export default function foo(state=initialState, action){
    switch (action.type){
        case GET_PRODUCTOIMAGENES:
            return {
                ...state,
                lista: action.payload
            };

        case GET_PRODUCTOIMAGENES_RESTAURANT:
            return {
                ...state,
                lista: action.payload
            };
        
        case ADD_PRODUCTOIMAGEN:
            return {
                ...state,
                lista: [...state.lista, action.payload]
            };

        case EDIT_PRODUCTOIMAGEN:
            return {
                ...state,
                lista: [...state.lista.filter(item => item.id !== action.payload.id), action.payload]
            };

        case DELETE_PRODUCTOIMAGEN:
            return{
                ...state,
                lista: state.lista.filter(item=> item.id !== action.payload)
            };

        default:{
            return state;
        }
            
    }
}